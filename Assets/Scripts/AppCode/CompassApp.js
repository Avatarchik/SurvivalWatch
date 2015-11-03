#pragma strict
import UnityEngine.Compass;

 private var DirectionTxt : UnityEngine.UI.Text;
 private var displayRect : Rect;

//watch
 private var watch : GameObject;

function Start () {
	DirectionTxt = gameObject.Find("Direction").GetComponent(UnityEngine.UI.Text);
	watch = GameObject.Find("Watch");
}

function Update () {
	DirectionTxt.text = getCompassStr();
}

function getCompassStr() {
 	var dir = watch.transform.rotation.eulerAngles.y;
	var dirTxt = "";
	if(dir >= 348.75 || dir < 11.25)
		dirTxt = "N";
	else if(dir >= 11.25 && dir < 33.75)
		dirTxt = "N N E";
	else if(dir >= 33.75 && dir < 56.25)
		dirTxt = "N E";
	else if(dir >= 56.25 && dir < 78.75)
		dirTxt = "E N E";
	else if(dir >= 78.75 && dir < 101.25)
		dirTxt = "E";
	else if(dir >= 101.25 && dir < 123.75)
		dirTxt = "E S E";
	else if(dir >= 123.75 && dir < 146.25)
		dirTxt = "S E";
	else if(dir >= 146.25 && dir < 168.75)
		dirTxt = "S S E";
	else if(dir >= 168.75 && dir < 191.25)
		dirTxt = "S";
	else if(dir >= 191.25 && dir < 213.75)
		dirTxt = "S S W";
	else if(dir >= 213.75 && dir < 236.25)
		dirTxt = "S W";
	else if(dir >= 236.25 && dir < 258.75)
		dirTxt = "W S W";
	else if(dir >= 281.25 && dir < 303.75)
		dirTxt = "W";
	else if(dir >= 303.75 && dir < 326.25)
		dirTxt = "N W";
	else if(dir >= 326.25 && dir < 348.75)
		dirTxt = "N N W";
		
	return dirTxt;
 }