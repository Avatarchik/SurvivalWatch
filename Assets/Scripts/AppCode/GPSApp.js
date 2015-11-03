#pragma strict

 private var latTxt : UnityEngine.UI.Text;
 private var longTxt : UnityEngine.UI.Text;
 private var altTxt : UnityEngine.UI.Text;
 
 //camera
 private var cam : GameObject;
 
function Start () {
 		latTxt = gameObject.Find("Latitude").GetComponent(UnityEngine.UI.Text);
 		longTxt = gameObject.Find("Longitude").GetComponent(UnityEngine.UI.Text);
 		altTxt = gameObject.Find("Altitude").GetComponent(UnityEngine.UI.Text);
 		cam = GameObject.Find("Main Camera");
}

function Update () {
	latTxt.text = "Latitude:\n" + "N" + Math.Abs(Math.Round(cam.transform.position.x)) + "°26'44.82\"";
	longTxt.text = "Longitude:\n" + "W" + Math.Abs(Math.Round(cam.transform.position.z)) + "°41'27.48\"";
	altTxt.text = "Alt: " + Math.Abs(Math.Round(cam.transform.position.y)) + " ft";
}