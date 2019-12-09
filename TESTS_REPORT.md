**Total:** 65

**<span style='color:green'>Passed:</span>** 65

**<span style='color:red'>Failed:</span>** 0

**<span style='color:orange'>Skipped:</span>** 0

**<span style='color:grey'>Todo:</span>** 0

---

**Value**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a name  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a default value  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a animated value  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a default duration  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a default easing  

**Value** **.to**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should change values on `to` method  



**Modal Scene**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a name  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has value active  

**Modal Scene** **.show**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should change active value  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should invoke .to method on value with provided duration  

**Modal Scene** **.hide**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should change active value  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should invoke .to method on value with provided duration  



**Stack Scene**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a name  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has value active and depth  

**Stack Scene** **.show**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should invoke .to method on value with provided duration  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should change active and depth values  

**Stack Scene** **.hide**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should invoke .to method on value with provided duration  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should change active and depth values  

**Stack Scene** **.dive**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should change depth value  



**AndroidBack**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should match snapshot  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should subscribe onPress to android_back event  



**Wrap**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should match snapshot  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should subscribe to lock and unlock  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should disable pointer events when navigation is locked  



**Modal.Wrap**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should match snapshot  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should render overlay view if overlay prop passed  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should render backgroundColor transparent if transparent prop passed  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should remove all listeners from scene active on unmount  

**Modal.Wrap** **loading prop**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should be true by default  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should be false when scene is showed and true when hidden  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should pass id and loading props to children if children if function  



**Modal.Navigator**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a name  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has an empty scenes object  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has an empty history array  

**Modal.Navigator** **.addScenes**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add scenes by names  

**Modal.Navigator** **.current**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should return last item from history  

**Modal.Navigator** **.go**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should reject if no scene exists  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should not add scene if it is already in history  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should invoke show on scene with provided duration  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add scene into history  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add scene after animation is done  

**Modal.Navigator** **.back**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should resolve if history is empty  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should reject if no such scene exists  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should invoke scene hide with provided duration  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should remove scene after animation is done  

**Modal.Navigator** **.reset**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should call hide for all scenes with duration 0  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should clean up history after all scenes are hidden  



**Stack.Navigator**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a name  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has an empty scenes object  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has an empty history array  

**Stack.Navigator** **.addScenes**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add scenes by names  

**Stack.Navigator** **.current**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should return last item from history  

**Stack.Navigator** **.go**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should reject if no scene exists  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should not add scene if it is already in history  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should dive all scenes in history on one level  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should invoke show on scene with provided duration  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add scene into history  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add scene after animation is done  

**Stack.Navigator** **.back**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should resolve if history is empty  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should reject if no such scene exists  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should invoke scene hide with provided duration  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should dive all scenes in history on one level  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should remove scene after animation is done  

**Stack.Navigator** **.reset**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should call hide for all scenes with duration 0  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should clean up history after all scenes are hidden  

