**Total:** 18

**<span style='color:green'>Passed:</span>** 1

**<span style='color:red'>Failed:</span>** 0

**<span style='color:orange'>Skipped:</span>** 17

**<span style='color:grey'>Todo:</span>** 0

---

**Stack.Navigator**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should has a name  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should has an empty scenes object  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should has an empty history array  

**Stack.Navigator** **.addScenes**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should add scenes by names  

**Stack.Navigator** **.current**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should return last item from history  

**Stack.Navigator** **.go**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should reject if no scene exists  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should not add scene if it is already in history  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should dive all scenes in history on one level  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should invoke show on scene with provided duration  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should add scene into history  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should add scene after animation is done  

**Stack.Navigator** **.back**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should resolve if history is empty  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should reject if no such scene exists  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should invoke scene hide with provided duration  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should dive all scenes in history on one level  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should remove scene after animation is done  

**Stack.Navigator** **.reset**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should call hide for all scenes with duration 0  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:orange'>–</span> should clean up history after all scenes are hidden  

