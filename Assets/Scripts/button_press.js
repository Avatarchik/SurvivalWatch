#pragma strict

var anim: Animation;
function OnMouseDown() {
	anim = GetComponent.<Animation>();
	anim.Play("button_anim");
}