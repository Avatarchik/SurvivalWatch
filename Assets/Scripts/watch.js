//CS 255 - HCI - Project 1
//Watch logic (panels, apps, buttons)

import UnityEngine.UI;
import System;
import System.Math;

 //LEDs
 private var blinkDelay:int = 2;
 private var blink = false;
 private var counter:int = 0;

 
 //buttons
 private var hit : RaycastHit;
 private var ray : Ray;
 private var powerBtn : GameObject;
 private var menuKnob : GameObject;
 private var topSideButton : GameObject;
 private var bottomSideButton : GameObject;
 private var TopPartButton : GameObject;
 private var BottomPartButton : GameObject;
 private var AppSwitchButton : GameObject;
 private var LockButton : GameObject;
 var anim: Animator;
 
 
 
 //screen
 private var watchScreen : GameObject;
 private var appZone : GameObject;
 
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
 
 //Template reader/switch
 private var appdata : String;
 private var templatePath : String;
 private var lockIndicator : GameObject;
 private var locked : boolean = true;
 
 // USB
 private var USBConnected = false;
 private var USBConnectionStatus : UnityEngine.UI.Text;
 private var USBScreen : GameObject;
 
 function Start()
 {
		//watch screen
		watchScreen = GameObject.Find("WatchScreen");
		appZone = GameObject.Find("AppZone");
		
		//buttons
		powerBtn = GameObject.Find("PowerButton");
		menuKnob = GameObject.Find("MenuKnob");
		topSideButton = GameObject.Find("TopSideButton");
		bottomSideButton = GameObject.Find("BottomSideButton");
		TopPartButton = GameObject.Find("TopPartButton");
		BottomPartButton = GameObject.Find("BottomPartButton");
		AppSwitchButton = GameObject.Find("AppSwitchButton");
		LockButton = GameObject.Find("LockButton");
		lockIndicator = GameObject.Find("LockIndicator");
		anim = AppSwitchButton.GetComponent(UnityEngine.Animator);
		
		USBConnectionStatus = GameObject.Find("USBConnectionStatus").GetComponent(UnityEngine.UI.Text);
		USBScreen = GameObject.Find("USBScreen");
		
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
 		
 		//READ LAYOUT FILES
 		// Sets to this: C:\Documents and Settings\Administrator\Application Data
 		appdata = System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData);  
 		templatePath = appdata + "\\.SWatch\\Templates\\";
 		if(System.IO.Directory.Exists(templatePath)) {
 			
 		}
 		else {
 			System.IO.Directory.CreateDirectory(templatePath);
 		}
 		if(System.IO.File.Exists(appdata + "\\.SWatch\\connected")) {
 			System.IO.File.Delete(appdata + "\\.SWatch\\connected");
 		}
 }
 
 
 
 function OnGUI()
 {
 	if(USBConnected) {
 		if (GUI.Button(Rect(10,130,130,50),"Disconnect USB")) 
			disconnectUSB();
	}
 	else {
 		if (GUI.Button(Rect(10,130,130,50),"Connect USB"))
			connectUSB();
	}
 }
 
 function connectUSB() {
 	USBConnected = !USBConnected;
 	System.IO.File.Create(appdata + "\\.SWatch\\connected");
 	for (var child : Transform in appZone.transform) {
    	child.gameObject.SetActive(false);
	}	
	USBConnectionStatus.text = "Connected to:\n " + System.Environment.MachineName;
	USBScreen.SetActive(true);
 }
 
 function disconnectUSB() {
 	USBConnected = !USBConnected;
 	if(System.IO.File.Exists(appdata + "\\.SWatch\\connected")) {
 		System.IO.File.Delete(appdata + "\\.SWatch\\connected");
 	}
 	USBScreen.SetActive(false);
 }
 
function Update () {
	if(blink)
		counter--;
	else
		counter++;
    if(counter == blinkDelay)
	{
        counter = (blinkDelay/2);
        blink = true;
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
        if(ledBlinking) {
        	rtLED.color = Color.red;
        	rbLED.color = Color.white;
        	ltLED.color = Color.red;
        	lbLED.color = Color.white;
        }
	}
    //timeAMPM.text = System.DateTime.Now.ToString("tt");
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
        if(hit.collider == BottomPartButton.GetComponent(Collider))
        {
        	if(!locked) {
				anim.Play("BOTTOM", -1, 1);
			}
        }
        if(hit.collider == TopPartButton.GetComponent(Collider))
        {
        	if(!locked) {
				anim.Play("TOP", -1, 1);
			}
        }
        if(hit.collider == LockButton.GetComponent(Collider))
        {
				locked = !locked;
				lockIndicator.SetActive(locked);
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
 
 function OnApplicationQuit() {
 	if(System.IO.File.Exists(appdata + "\\.SWatch\\connected")) {
 		System.IO.File.Delete(appdata + "\\.SWatch\\connected");
 	}
 }
 

 
