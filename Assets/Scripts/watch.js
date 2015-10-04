//CS 255 - HCI - Project 1
//Watch logic (panels, apps, buttons)

import UnityEngine.UI;
import UnityEngine.Compass;
import System;
import System.Math;

//time app
 var timeTxt : UnityEngine.UI.Text;
 var timeAMPM : UnityEngine.UI.Text;
 private var blinkSpeed:int = 60;
 private var blink = false;
 private var counter:int = 0;
 
 //gps app
 private var latTxt : UnityEngine.UI.Text;
 private var longTxt : UnityEngine.UI.Text;
 private var altTxt : UnityEngine.UI.Text;
 
 //calander app
 private var dayOfWeekTxt : UnityEngine.UI.Text;
 private var dayOfMonthTxt : UnityEngine.UI.Text;
 private var monthTxt : UnityEngine.UI.Text;
 
 //compass app
 private var DirectionTxt : UnityEngine.UI.Text;
 private var displayRect : Rect;
 
 //buttons
 private var hit : RaycastHit;
 private var ray : Ray;
 private var powerBtn : GameObject;
 private var menuKnob : GameObject;
 private var topSideButton : GameObject;
 private var bottomSideButton : GameObject;
 
 //screen
 private var watchScreen : GameObject;
 
 //camera
 private var cam : GameObject;
 
 //watch
 private var rotating : boolean;
 private var watch : GameObject;
 private var watchPivot : GameObject;
 
 //LEDs
 private var rtLED : UnityEngine.Light;
 private var rbLED : UnityEngine.Light;
 private var ltLED : UnityEngine.Light;
 private var lbLED : UnityEngine.Light;
 private var ledOn : boolean;
 private var ledBlinking : boolean;
 
 function Start()
 {
 		//gps app
 		latTxt = GameObject.Find("Latitude").GetComponent(UnityEngine.UI.Text);
 		longTxt = GameObject.Find("Longitude").GetComponent(UnityEngine.UI.Text);
 		altTxt = GameObject.Find("Altitude").GetComponent(UnityEngine.UI.Text);
 		
 		//time app
		timeTxt = GameObject.Find("Time").GetComponent(UnityEngine.UI.Text);
		timeAMPM = GameObject.Find("AM/PM").GetComponent(UnityEngine.UI.Text);
		
		//calander app
		dayOfWeekTxt = GameObject.Find("DayOfWeek").GetComponent(UnityEngine.UI.Text);
		dayOfMonthTxt = GameObject.Find("DayOfMonth").GetComponent(UnityEngine.UI.Text);
		monthTxt = GameObject.Find("Month").GetComponent(UnityEngine.UI.Text);
		
		//compass app
		DirectionTxt = GameObject.Find("Direction").GetComponent(UnityEngine.UI.Text);

		
		//watch screen
		watchScreen = GameObject.Find("WatchScreen");
		
		//buttons
		powerBtn = GameObject.Find("PowerButton");
		menuKnob = GameObject.Find("MenuKnob");
		topSideButton = GameObject.Find("TopSideButton");
		bottomSideButton = GameObject.Find("BottomSideButton");
		
		//camera
		cam = GameObject.Find("Main Camera");
		
		//watch
		watch = GameObject.Find("Watch");
		watchPivot = GameObject.Find("WatchPivot");
		rotating = false;
		
		//LEDs
		rtLED = GameObject.Find("RightTopLEDLight").GetComponent(UnityEngine.Light);
 		rbLED = GameObject.Find("RightBottomLEDLight").GetComponent(UnityEngine.Light);
 		ltLED = GameObject.Find("LeftTopLEDLight").GetComponent(UnityEngine.Light);
 		lbLED = GameObject.Find("LeftBottomLEDLight").GetComponent(UnityEngine.Light);
 		LEDStatus = "off";
 }
 
 function OnGUI()
 {

 }
 
function Update () {

	//gps app
	latTxt.text = "Latitude:\n" + "N" + Math.Abs(Math.Round(cam.transform.position.x)) + "°26'44.82\"";
	longTxt.text = "Longitude:\n" + "W" + Math.Abs(Math.Round(cam.transform.position.z)) + "°41'27.48\"";
	altTxt.text = "Alt: " + Math.Abs(Math.Round(cam.transform.position.y)) + " ft";

	// Time app
 	var dt : System.DateTime = System.DateTime.Now;
 	var h : int = dt.Hour;
 	var m : int = dt.Minute;
 	var s : int = dt.Second;
 	
 	//calander app
 	dt = System.DateTime.Now;
 	dayOfWeekTxt.text = dt.DayOfWeek.ToString().Substring(0,3) + "";
	dayOfMonthTxt.text = String.Format("{0:00}", dt.Day);
	monthTxt.text = String.Format("{0:00}", dt.Month);
	
	//compass app
	DirectionTxt.text = getCompassStr();
 	
 	//convert to 12-hour
    if (h > 12)
    	h = h-12;
    else if (h == 0)
        h = 12;
 	

	if(blink)
		counter--;
	else
		counter++;
    if(counter == blinkSpeed)
	{
        counter = (blinkSpeed/2);
        blink = true;
        timeTxt.text = String.Format("{0:00} {1:00}", h, m);
        
        //LED blinking
        if(ledBlinking) {
        	rtLED.color = Color.white;
        	rbLED.color = Color.red;
        	ltLED.color = Color.white;
        	lbLED.color = Color.red;
        }
    } 
	else if(counter == 0){
        blink = false;
        timeTxt.text = String.Format("{0:00}:{1:00}", h, m);
        if(ledBlinking) {
        	rtLED.color = Color.red;
        	rbLED.color = Color.white;
        	ltLED.color = Color.red;
        	lbLED.color = Color.white;
        }
	}
    timeAMPM.text = System.DateTime.Now.ToString("tt");
    // buttons
    ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    //paint mouse ray
    //Debug.DrawLine (ray.origin, Camera.main.transform.forward * 50000000, Color.red);

    if(Physics.Raycast(ray, hit, Mathf.Infinity) && Input.GetMouseButtonDown(0))
    {
    	if(hit.collider == powerBtn.GetComponent(Collider))
        {
        	if(watchScreen.active)
            	watchScreen.SetActive(false);
            else
                watchScreen.SetActive(true);
        }
        if(hit.collider == topSideButton.GetComponent(Collider))
        {
        		ledOn = !ledOn;
        		rtLED.enabled = ledOn;
        		rbLED.enabled = ledOn;
        		ltLED.enabled = ledOn;
        		lbLED.enabled = ledOn;
        }
        if(hit.collider == bottomSideButton.GetComponent(Collider))
        {
        		ledBlinking = !ledBlinking;
        }
	}
    
     // knob
     // knob rotation
	if (Input.GetMouseButton(0))
     {
           var x = -Input.GetAxis("Mouse X");
           var y = -Input.GetAxis("Mouse Y");
           var speed = 5;
           menuKnob.transform.Rotate(Vector3.left * y * speed, Space.World);    
           menuKnob.transform.Rotate(Vector3.right * x * speed, Space.World);
     }
     
     
     
     //watch
     //rotate around a sphere called the WatchPivot
     if(Input.GetKeyUp(KeyCode.R))
		if(rotating)
			rotating = false;
		else
			rotating = true;
     if(rotating)
     	watch.transform.RotateAround(watchPivot.transform.position, Vector3.up,0.2);
}		

 function Awake()
 {

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
 
