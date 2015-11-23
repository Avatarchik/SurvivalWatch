#pragma strict

 var timeTxt : UnityEngine.UI.Text;
 var timeAMPM : UnityEngine.UI.Text;
 private var blinkDelay:int = 60;
 private var blink = false;
 private var counter:int = 0;

 private var timeTxtArray = new Array();
 private var AMPMTxtArray = new Array();

function Start () {
	timeTxt =  gameObject.Find("Time").GetComponent(UnityEngine.UI.Text);
	timeAMPM = gameObject.Find("AM/PM").GetComponent(UnityEngine.UI.Text);
	
	for(var obj : UnityEngine.UI.Text in this.FindObjectsOfType(UnityEngine.UI.Text))
	{
   		if(obj.name == "Time")
    	{
        	timeTxtArray.push(obj);
    	}
	}
	
	for(var obj : UnityEngine.UI.Text in this.FindObjectsOfType(UnityEngine.UI.Text))
	{
   		if(obj.name == "AM/PM")
    	{
        	AMPMTxtArray.push(obj);
    	}
	}
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
        for(var obj : UnityEngine.UI.Text in timeTxtArray)
		{
        	obj.text = String.Format("{0:00} {1:00}", h, m);
		}
        //timeTxt.text = String.Format("{0:00} {1:00}", h, m);
    } 
	else if(counter == 0){
        blink = false;
        for(var obj : UnityEngine.UI.Text in timeTxtArray)
		{
        	obj.text = String.Format("{0:00}:{1:00}", h, m);
        }
	}
	for(var obj : UnityEngine.UI.Text in AMPMTxtArray)
	{
    	obj.text = System.DateTime.Now.ToString("tt");
    }
}