 private var watchPivot : GameObject;
 

 function Start()
 {
 	watchPivot = GameObject.Find("WatchPivot");
 }
 
 function Update () 
 {
 
     if (Input.GetMouseButton(0))
     {
           var x = -Input.GetAxis("Mouse X");
           var y = -Input.GetAxis("Mouse Y");
           var speed = 2;
           this.transform.RotateAround(watchPivot.transform.position, Vector3.down * y, speed);    
           this.transform.RotateAround(watchPivot.transform.position, Vector3.up * x, speed);
     }
 }