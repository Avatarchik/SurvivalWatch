var mainSpeed : float = 100.0; //regular speed
var shiftAdd : float = 250.0; //multiplied by how long shift is held.  Basically running
var maxShift : float = 1000.0; //Maximum speed when holdin gshift
var camSens : float = 0.25; //How sensitive it with mouse
private var lastMouse = Vector3(255, 255, 255); //kind of in the middle of the screen, rather than at the top (play)
private var totalRun : float  = 1.0;

var lockMouse : boolean;


 
 function Start()
 {
		Cursor.visible = false;
    	Cursor.lockState = CursorLockMode.Confined;
    	lockMouse = true;
 }
 
 function OnGUI()
 {
		//draw instructions
		GUI.Label(new Rect(10, 10, 200, 200), "W A S D - Movement\nLeft Shift - Hold for speed\nMouse - Look\nQ - Go up\nZ / Left CTRL - Go down\nLeft Alt - Click mode\nR - Start/Stop display mode");
 }
 
 function Update () {
	 if (Application.platform == RuntimePlatform.Android) {

   
     } else {
     
	// mouse camera controls, has problems when enabling/disabling mouse cursor
	if(lockMouse) {
    lastMouse = Input.mousePosition - lastMouse ;
    lastMouse = Vector3(-lastMouse.y * camSens, lastMouse.x * camSens, 0 );
    lastMouse = Vector3(transform.eulerAngles.x + lastMouse.x , transform.eulerAngles.y + lastMouse.y, 0);
    transform.eulerAngles = lastMouse;
    lastMouse =  Input.mousePosition;
    //Mouse  camera angle done.  
   
    //Keyboard commands
    var f : float = 0.0;
    var p = GetBaseInput();
    if (Input.GetKey (KeyCode.LeftShift)){
        totalRun += Time.deltaTime;
        p  = p * totalRun * shiftAdd;
        p.x = Mathf.Clamp(p.x, -maxShift, maxShift);
        p.y = Mathf.Clamp(p.y, -maxShift, maxShift);
        p.z = Mathf.Clamp(p.z, -maxShift, maxShift);
    }
    else{
        totalRun = Mathf.Clamp(totalRun * 0.5, 1, 1000);
        p = p * mainSpeed;
    }
   
    p = p * Time.deltaTime;
    if (Input.GetKey(KeyCode.Space)){ //If player wants to move on X and Z axis only
        f = transform.position.y;
        transform.Translate(p);
        transform.position.y = f;
    }
    else{
        transform.Translate( p);
    }
    }
    if (Input.GetKeyUp (KeyCode.LeftAlt)){
    	if(lockMouse) {
    		Cursor.visible = true;
    		Cursor.lockState = CursorLockMode.Locked;
    		Cursor.lockState = CursorLockMode.None;
    		lockMouse = false;
    	} else {
    		Cursor.visible = false;
    		Cursor.lockState = CursorLockMode.Confined;
    		lockMouse = true;
    	}
	
    }
   	}
}
 
private function GetBaseInput() : Vector3 { //returns the basic values, if it's 0 than it's not active.
    var p_Velocity : Vector3;
    if (Input.GetKey (KeyCode.W)){
        p_Velocity += Vector3(0, 0 , 1);
    }
    if (Input.GetKey (KeyCode.S)){
        p_Velocity += Vector3(0, 0 , -1);
    }
    if (Input.GetKey (KeyCode.A)){
        p_Velocity += Vector3(-1, 0 , 0);
    }
    if (Input.GetKey (KeyCode.D)){
        p_Velocity += Vector3(1, 0 , 0);
    }
    if (Input.GetKey (KeyCode.Q)){
        p_Velocity += Vector3(0, 1 , 0);
    }
    if (Input.GetKey (KeyCode.Z)){
        p_Velocity += Vector3(0, -1 , 0);
    }
    if (Input.GetKey (KeyCode.LeftControl)){
        p_Velocity += Vector3(0, -1 , 0);
    }
    return p_Velocity;
}