**Total:** 48

**<span style='color:green'>Passed:</span>** 48

**<span style='color:red'>Failed:</span>** 0

**<span style='color:orange'>Skipped:</span>** 0

**<span style='color:grey'>Todo:</span>** 0

---

**AndroidBack**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should match snapshot  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should subscribe onPress to android_back event  



**Value**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a name  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a default value  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a animated value  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a default duration  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a default easing  

**Value** **.to**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should change values on `to` method  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should emit event on start and end of animation  



**Modal Navigator**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a name  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has an empty scenes object  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has an empty history array  

**Modal Navigator** **.addScenes**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add scenes  

**Modal Navigator** **.current**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should return last item from history  

**Modal Navigator** **.go**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should reject if no scene exists  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should not add scene if it is already in history  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add scene into history  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should invoke show on scene  



**Modal.Wrap**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should match snapshot  

**Modal.Wrap** **loading prop**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should be true by default  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should be false when scene is showed  



**Modal Scene**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a name  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has value active  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a method `show` that changes active value  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a method `hide` that changes active value  



**Events**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a static id method  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has listeners as an empty object  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a sepatator  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has any event  

**Events** **.on**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add listener with name parsed from eventId  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add any listener  

**Events** **.off**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should remove listener by eventId  

**Events** **.parse**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should parse eventId into name and id  

**Events** **.emit**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should run all listeners with corresponding id  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should run all listeners with corresponding event name  



**helpers** **fromId**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should parse id into array of navigator and scene  



**Wrap**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should match snapshot  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should disable pointer events during animation any values  



**helpers** **toId**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should stringify navigator and scene names  



**navigation**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should has a navigators as an empty object  

**navigation** **.addNavigators**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add navigators by their names  

**navigation** **.go**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should reject if there is no such navigator  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should add navigator to history  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should move navigator to the end in history if it is already exist  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should run go on the navigator  

**navigation** **.back**

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should resolve if history is empty  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should call back on the navigator  

&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:green'>✓</span> should remove navigator from history if navigator history is empty  

