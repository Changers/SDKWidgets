# Setup
* Run `git clone https://github.com/Changers/SDKWidgets`
* Run `cd examples/hello-world-lit-js`
* Run `npm install http-server -g`
* Run `http-server ./`

# Test
* Open `https://sdk.changers.com` in browner
* Open devtools, switch to mobile view and enter this in console: 
```
registerWidget('hello-world', 'http://127.0.0.1:8082/hello-world.js', 'after-token')

init(`{
	"permission": [{
		"motion": true,
		"gps": true,
		"notification": true
	}],
	"type": "initialize",
	"env": "stage",
	"app_name": "duesseldorf",
	"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE4YjRlMWNjZDRiNzFkYmUyNTYwYzcwODYzODM4MDFkZDI0YjI1ZTllMWUxZGYwN2RkYWZjZjBiZDI1MDAxMzg4ZTNmZmNmOGQ0M2UxNDEwIn0.eyJhdWQiOiIxIiwianRpIjoiYThiNGUxY2NkNGI3MWRiZTI1NjBjNzA4NjM4MzgwMWRkMjRiMjVlOWUxZTFkZjA3ZGRhZmNmMGJkMjUwMDEzODhlM2ZmY2Y4ZDQzZTE0MTAiLCJpYXQiOjE2NDgyOTA2NjIsIm5iZiI6MTY0ODI5MDY2MiwiZXhwIjo3OTU5NjM3ODYyLCJzdWIiOiI0NzE3MiIsInNjb3BlcyI6WyIqIl19.tJpa0xD7wFHccHPAgEcXtLasMz_cqPVUSsqpo8tBdieRLtmICOuhpPK1YU_JcIbV2ijlggcrLbQ0oWJf94xpsQUlcCPKDitAxXCH3628ApTs…IDyVhyJRSgmraYve_PL6wYoXq8vFVYb2Dh_MVcg3wotDlp2ewmhF66JnuXQgDqZxK6u8Wu4jgWk7GUc6Itv2ldf84_Mh-y7F-57LAXenvm_uJORWeu8qD7x5UVPT3mKcBO8ZLtubGQ_s2TuCiwDo0Yrn3Gzu2jDXXRJHpaIki_XHR1rNEdIVIhxxJl0Oq0Kv5ea48Bl_3mjAkhjrjOMzze1W6O6GcFNcAuVkhLiHVwotqkBGWvxDL2OswfFl-p3XYYP98pZS4jfesvJKZseFgOZJMovZDrHa_NpKPa2v48GRn0e-l23wZCBc9Q0_QatXeZCFclJzUYJAdKxy-Coy_JHsAr8Ci2v7lMFpBK9QO8rmRbs8bX6F829mitTU_ifCSyadfEQ73EnyI-KUeHm7asrtlTzEOMC5sbISIYhoXEuTNVXIdCoHGk1Sh6E8uar-CHb7LB6u1XqGXXXvQPETTRARTU6fMpcrNqOXc7woPZgMYAnriaW0bBaJ1vk5960",
	"data": {
		"lastCo2Avoided": 0
	},
	"headers": {
		"x-app": "darmstadt",
		"x-agent": "(ChangersAuto\/1.0.0) (com.blacksquared.changers-sdk) SDK"
	},
	"motiontag": {
		"last_transmitted": "08.09.20, 11:05",
		"last_event": "08.09.20, 11:05"
	},
	"pp_accepted": true,
	"app_version": "1.1.0"
}`)
```