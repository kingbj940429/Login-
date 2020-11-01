const local = require("./localStrategy");
const dbPool = require('../config/config.js') //DB 연결

module.exports = passport => {
  /** 
  * req.session 객체에 어떤 데이터를 저장할지 선택
  */
  passport.serializeUser((user, done) => {   // req.login()에서 넘겨준 user값
    done(null, user.email);                     // user에서 id만 세션에 저장
    console.log("시리얼라이즈유저" , user.email);
    
  });

  /**
   * deserializeUser는 매 요청시 실행
   * passport.session() 미들웨어가 항상 호출
   * serializeUser에서 세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보 조회
   * 조회한 정보를 req.user에 저장 (req.user는 정해져 있는 값인듯 하다. req.user1 이런식으로 못바꾸는 듯)
   */
  passport.deserializeUser(async(email, done) => {  // 매개변수 id는 세션에 저장됨 값(req.session.passport.user)
    try {
      let user = await dbPool(`select * from test.auth where email='${email}'`);
      console.log(email);
      console.log("디시리얼라이즈",user);
      user = done(null, user);
    } catch (error) {
      done(error);
    }
  });

  local(passport);
};
