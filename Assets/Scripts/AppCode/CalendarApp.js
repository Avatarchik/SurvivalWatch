#pragma strict

 private var dayOfWeekTxt : UnityEngine.UI.Text;
 private var dayOfMonthTxt : UnityEngine.UI.Text;
 private var monthTxt : UnityEngine.UI.Text;

function Start () {
		dayOfWeekTxt = gameObject.Find("DayOfWeek").GetComponent(UnityEngine.UI.Text);
		dayOfMonthTxt = gameObject.Find("DayOfMonth").GetComponent(UnityEngine.UI.Text);
		monthTxt = gameObject.Find("Month").GetComponent(UnityEngine.UI.Text);
}

function Update () {
	var dt : System.DateTime = System.DateTime.Now;
 	dt = System.DateTime.Now;
 	dayOfWeekTxt.text = dt.DayOfWeek.ToString().Substring(0,3) + "";
	dayOfMonthTxt.text = String.Format("{0:00}", dt.Day);
	monthTxt.text = String.Format("{0:00}", dt.Month);
}