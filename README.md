# 로그인 기능 구현
## 개요
```
단순히 form태그로 문자열 비교하는 로그인이 아닌, Node.js로 session, passport, 
passport-local로 로직을 짜고 DB와 연동하여 만든 로그인 기능입니다. (로그아웃 가능)
```
## 전체 과정
* 로그인 전
```
1) 로그인 요청이 들어옵니다. (/auth/login)
2) passport.authenticate 메서드를 호출합니다.
3) 로그인 localStrategey 를 수행합니다.
4) 로그인 성공시 정보 객체와 함께 req.login 미들웨어 호출
5) res.login 메서드가 passport.serializeUser 호출
6) req.session에 사용자 아이디만 저장
7) 로그인 완료
```
* 로그인 후
```
1) 모든 요청에 passport.session() 미들웨어가 passport.deserializeUser 메서드 호출
2) req.session에 저장된 아이디로 DB에서 사용자 조회
3) 조회된 사용자 정보를 req.user에 저장
4) 라우터에서 req.user 객체 사용 가능
```
* routes/middlewares
```
로그인 했을 시 접근 가능한 곳과 불가능한 곳 구분해준다.
```
