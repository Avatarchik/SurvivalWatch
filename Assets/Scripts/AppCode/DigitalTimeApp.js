#pragma strict

 var timeTxt : UnityEngine.UI.Text;
 var timeAMPM : UnityEngine.UI.Text;
 private var blinkDelay:int = 60;
 private var blink = false;
 private var counter:int = 0;

function Start () {
	timeTxt = gameObject.Find("Time").GetComponent(UnityEngine.UI.Text);
	timeAMPM = gameObject.Find("AM/PM").GetComponent(UnityEngine.UI.Text);
}

function Update () {
	var dt : System.DateTime = System.DateTime.Now;
 	var h : int = dt.Hour;
 	var m : int = dt.Minute;
 	var s : int = dt.Second;
 	
 	
 	if (h > 12)
    	h = h-12;
    else if (h == 0)
        h = 12;
 	

	if(blink)
		counter--;
	else
		counter++;
    if(counter == blinkDelay)
	{
        counter = (blinkDelay/2);
        blink = true;
        timeTxt.text = String.Format("{0:00} {1:00}", h, m);
    } 
	else if(counter == 0){
        blink = false;
        timeTxt.text = String.Format("{0:00}:{1:00}", h, m);
	}
    timeAMPM.text = System.DateTime.Now.ToString("tt");
}