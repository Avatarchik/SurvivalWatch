import UnityEngine.UI;
import System;




//time app
 var timeTxt : UnityEngine.UI.Text;
 var timeAMPM : UnityEngine.UI.Text;
 private var blinkSpeed:int = 60;
 private var blink = false;
 private var counter:int = 0;
 
 //buttons
 var hit : RaycastHit;
 var ray : Ray;
 private var parent : GameObject;
 private var child : GameObject;
 
 //screen
 private var watchScreen : GameObject;
 
 
 function Start()
 {
 		//time app
		timeTxt = GameObject.Find("Time").GetComponent(UnityEngine.UI.Text);
		timeAMPM = GameObject.Find("AM/PM").GetComponent(UnityEngine.UI.Text);
		
		watchScreen = GameObject.Find("WatchScreen");
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
         timeTxt.text = String.Format("{0:00}", h) + " " + String.Format("{0:00}", m);
         timeAMPM.text = System.DateTime.Now.ToString("tt");
     } 
     else if(counter == 0){
         blink = false;
         timeTxt.text = String.Format("{0:00}", h) + ":" + String.Format("{0:00}", m);
         timeAMPM.text = System.DateTime.Now.ToString("tt");
     }
     
     
     
     
     // buttons
     ray = Camera.main.ScreenPointToRay(Input.mousePosition);
      Debug.DrawLine (ray.origin, Camera.main.transform.forward * 50000000, Color.red);

     if(Physics.Raycast(ray, hit, Mathf.Infinity) && Input.GetMouseButtonDown(0))
     {
         if(hit.collider == child.GetComponent(Collider))
         {
             print ("HIT!");
             if(watchScreen.active)
             	watchScreen.SetActive(false);
             else
                 watchScreen.SetActive(true);
         }
     }
     
     
}

 function Awake()
 {
     //parent = new GameObject("StarParent");
     child = GameObject.Find("Cube");
 }
 
