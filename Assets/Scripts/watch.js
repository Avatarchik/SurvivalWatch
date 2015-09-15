import UnityEngine.UI;
import System;




//time app
 var timeTxt : UnityEngine.UI.Text;
 var timeAMPM : UnityEngine.UI.Text;
 private var blinkSpeed:int = 60;
 private var blink = false;
 private var counter:int = 0;
 
 //buttons
 private var hit : RaycastHit;
 private var ray : Ray;
 private var powerBtn : GameObject;
 private var menuKnob : GameObject;
 
 //screen
 private var watchScreen : GameObject;
 
 
 function Start()
 {
 		//time app
		timeTxt = GameObject.Find("Time").GetComponent(UnityEngine.UI.Text);
		timeAMPM = GameObject.Find("AM/PM").GetComponent(UnityEngine.UI.Text);
		
		//watch screen
		watchScreen = GameObject.Find("WatchScreen");
		
		//buttons
		powerBtn = GameObject.Find("PowerButton");
		menuKnob = GameObject.Find("MenuKnob");
 }
 
 function OnGUI()
 {
		
		
 }
 
function Update () {
	// Time app
 	var dt : System.DateTime = System.DateTime.Now;
 	var h : int = dt.Hour;
 	var m : int = dt.Minute;
 	var s : int = dt.Second;
 	
	if(blink)
		counter--;
		else
		counter++;
   if(counter == blinkSpeed)
     {
     	counter = (blinkSpeed/2);
         blink = true;
         //convert to 12-hour
         if(h > 12)
         	h = h-12;
         timeTxt.text = String.Format("{0:00} {1:00}", h, m);
         timeAMPM.text = System.DateTime.Now.ToString("tt");
     } 
     else if(counter == 0){
         blink = false;
         if(h > 12)
         	h = h-12;
         timeTxt.text = String.Format("{0:00}:{1:00}", h, m);
         timeAMPM.text = System.DateTime.Now.ToString("tt");
     }
     
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
     }
     
     // knob
     // knob rotation
      if (Input.GetMouseButton(0))
      {
            x = -Input.GetAxis("Mouse X");
            y = -Input.GetAxis("Mouse Y");
            speed = 5;
            menuKnob.transform.Rotate(Vector3.left * y * speed, Space.World);    
            menuKnob.transform.Rotate(Vector3.right * x * speed, Space.World);
      }
}

 function Awake()
 {

 }
 
