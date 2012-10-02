$(function() {
    //var debug = document.getElementById("debug");
    var timerLable = document.getElementById("timer");
    var strokesLable = document.getElementById("strokes");
    var infoLable = document.getElementById("info");
	var canvas = $("#c");
	var canvasHeight;
	var canvasWidth;
	var ctx;
	var img;
    var pointCollection;
    var maxShotPower = 100;
    
	var imageIsLoaded = false;
    var touchMode = false;
	
    var startTick;
    var startTime = 0;
    var extraTime = 0;
    var ctrlDown = false;
    var strokes = 0;
    var startDragPos = null;
    
    var frameRate = null;

	function init() {
		img = new Image();
		img.src = "http://www.clker.com/cliparts/9/0/f/5/1194986802274589086football_ball_brice_boye_01.svg.med.png";

        updateCanvasDimensions();

        //var g = [new Point(0.08829568788501027, 0.1518987341772152), new Point(0.054414784394250515, 0.33634719710669075), new Point(0.09650924024640657, 0.41952983725135623), new Point(0.14681724845995894, 0.4593128390596745), new Point(0.2135523613963039, 0.4394213381555154), new Point(0.3059548254620123, 0.3182640144665461), new Point(0.5390143737166324, 0.3453887884267631), new Point(0.5154004106776181, 0.6075949367088608), new Point(0.29876796714579057, 0.6998191681735986), new Point(0.2946611909650924, 0.4231464737793852), new Point(0.45585215605749485, 0.46473779385171793), new Point(0.3624229979466119, 0.6962025316455697), new Point(0.1868583162217659, 0.5985533453887885), new Point(0.09753593429158111, 0.6546112115732369), new Point(0.11293634496919917, 0.6690777576853526), new Point(0.3028747433264887, 0.8462929475587704), new Point(0.5154004106776181, 0.8481012658227848), new Point(0.7217659137577002, 0.6075949367088608), new Point(0.5667351129363449, 0.6962025316455697), new Point(0.6786447638603696, 0.4719710669077758), new Point(0.8706365503080082, 0.3707052441229656), new Point(0.8193018480492813, 0.2585895117540687), new Point(0.7176591375770021, 0.31645569620253167), new Point(0.6550308008213552, 0.33634719710669075), new Point(0.6386036960985626, 0.0922242314647378), new Point(0.5924024640657084, 0.19529837251356238), new Point(0.3932238193018481, 0.081374321880651), new Point(0.26078028747433263, 0.18083182640144665), new Point(0.14271047227926079, 0.26220614828209765), new Point(0.09240246406570841, 0.162748643761302), new Point(0.21560574948665298, 0.2314647377938517), new Point(0.24743326488706366, 0.16817359855334538), new Point(0.34188911704312114, 0.3833634719710669), new Point(0.4527720739219713, 0.18264014466546113), new Point(0.5246406570841889, 0.12658227848101267), new Point(0.4620123203285421, 0.34177215189873417), new Point(0.3655030800821355, 0.18083182640144665), new Point(0.3398357289527721, 0.3471971066907776), new Point(0.3275154004106776, 0.6039783001808319), new Point(0.2597535934291581, 0.5605786618444847), new Point(0.40143737166324434, 0.5135623869801085), new Point(0.4681724845995893, 0.7070524412296564), new Point(0.41683778234086244, 0.8752260397830018), new Point(0.3788501026694045, 0.9312839059674503), new Point(0.5574948665297741, 0.9403254972875226), new Point(0.6242299794661191, 0.9204339963833634), new Point(0.5965092402464066, 0.7739602169981917), new Point(0.7012320328542094, 0.6184448462929476), new Point(0.5965092402464066, 0.4430379746835443), new Point(0.5574948665297741, 0.43399638336347196), new Point(0.6232032854209446, 0.6039783001808319), new Point(0.6560574948665298, 0.701627486437613), new Point(0.6714579055441479, 0.8607594936708861), new Point(0.75564681724846, 0.48282097649186256), new Point(0.742299794661191, 0.36347197106690776), new Point(0.8531827515400411, 0.42857142857142855), new Point(0.795687885010267, 0.5316455696202531), new Point(0.7885010266940452, 0.3345388788426763), new Point(0.9630390143737166, 0.3399638336347197), new Point(0.9671457905544147, 0.4412296564195298), new Point(0.8921971252566735, 0.484629294755877), new Point(0.9086242299794661, 0.3309222423146474), new Point(0.9209445585215605, 0.37251356238698013), new Point(0.6981519507186859, 0.15913200723327306), new Point(0.63347022587269, 0.24954792043399637), new Point(0.6509240246406571, 0.13743218806509946), new Point(0.715605749486653, 0.06329113924050633), new Point(0.7751540041067762, 0.07956600361663653), new Point(0.771047227926078, 0.22965641952983726), new Point(0.7546201232032854, 0.2640144665461121), new Point(0.4948665297741273, 0.03616636528028933), new Point(0.4681724845995893, 0.13381555153707053), new Point(0.5308008213552361, 0.2694394213381555), new Point(0.4086242299794661, 0.244122965641953), new Point(0.40451745379876797, 0.12296564195298372), new Point(0.31211498973305957, 0.15370705244122965), new Point(0.3141683778234086, 0.244122965641953), new Point(0.22587268993839835, 0.2730560578661845), new Point(0.2166324435318275, 0.35985533453887886), new Point(0.15297741273100615, 0.33815551537070526), new Point(0.08726899383983573, 0.32368896925858953), new Point(0.045174537987679675, 0.20433996383363473), new Point(0.024640657084188913, 0.3833634719710669), new Point(0.026694045174537988, 0.5244122965641953), new Point(0.023613963039014373, 0.5551537070524413), new Point(0.028747433264887063, 0.6763110307414105), new Point(0.054414784394250515, 0.5840867992766727), new Point(0.07597535934291581, 0.569620253164557), new Point(0.1293634496919918, 0.5714285714285714), new Point(0.2618069815195072, 0.7811934900542495), new Point(0.2002053388090349, 0.833634719710669), new Point(0.2135523613963039, 0.6546112115732369), new Point(0.42505133470225875, 0.5877034358047016), new Point(0.41478439425051333, 0.755877034358047), new Point(0.2679671457905544, 0.9529837251356239), new Point(0.5102669404517454, 0.945750452079566), new Point(0.5215605749486653, 0.4719710669077758), new Point(0.5913757700205339, 0.5714285714285714), new Point(0.40451745379876797, 0.3508137432188065), new Point(0.3182751540041068, 0.5063291139240507), new Point(0.1570841889117043, 0.14285714285714285), new Point(0.017453798767967144, 0.11392405063291139), new Point(0.004106776180698152, 0.3074141048824593), new Point(0.35010266940451745, 0.05063291139240506), new Point(0.5698151950718686, 0.028933092224231464), new Point(0.48254620123203285, 0.23508137432188064), new Point(0.6180698151950719, 0.36528028933092227), new Point(0.3665297741273101, 0.4538878842676311)];
        //var g = [new Point(0.0911214953271028, 0.28983050847457625),new Point(0.08995327102803738, 0.3220338983050847),new Point(0.08995327102803738, 0.3525423728813559),new Point(0.08878504672897196, 0.3864406779661017),new Point(0.08995327102803738, 0.4186440677966102),new Point(0.10864485981308411, 0.29152542372881357),new Point(0.13200934579439252, 0.29322033898305083),new Point(0.1483644859813084, 0.3152542372881356),new Point(0.16004672897196262, 0.34067796610169493),new Point(0.1588785046728972, 0.3711864406779661),new Point(0.1588785046728972, 0.4033898305084746),new Point(0.15537383177570094, 0.4288135593220339),new Point(0.13551401869158877, 0.4440677966101695),new Point(0.11682242990654206, 0.44745762711864406),new Point(0.09228971962616822, 0.4423728813559322),new Point(0.18925233644859812, 0.3338983050847458),new Point(0.2091121495327103, 0.3305084745762712),new Point(0.2324766355140187, 0.33728813559322035),new Point(0.2371495327102804, 0.3610169491525424),new Point(0.23481308411214954, 0.38813559322033897),new Point(0.23481308411214954, 0.42033898305084744),new Point(0.2441588785046729, 0.4457627118644068),new Point(0.2207943925233645, 0.4491525423728814),new Point(0.19976635514018692, 0.44745762711864406),new Point(0.18457943925233644, 0.39322033898305087),new Point(0.18457943925233644, 0.42203389830508475),new Point(0.1985981308411215, 0.38813559322033897),new Point(0.21845794392523366, 0.3864406779661017),new Point(0.26985981308411217, 0.3338983050847458),new Point(0.26985981308411217, 0.3593220338983051),new Point(0.27102803738317754, 0.3864406779661017),new Point(0.26869158878504673, 0.41694915254237286),new Point(0.26869158878504673, 0.4423728813559322),new Point(0.2827102803738318, 0.3389830508474576),new Point(0.3037383177570093, 0.33559322033898303),new Point(0.3189252336448598, 0.3593220338983051),new Point(0.3189252336448598, 0.38813559322033897),new Point(0.32009345794392524, 0.4135593220338983),new Point(0.3177570093457944, 0.4423728813559322),new Point(0.3469626168224299, 0.3593220338983051),new Point(0.3469626168224299, 0.3864406779661017),new Point(0.3446261682242991, 0.4135593220338983),new Point(0.3469626168224299, 0.43728813559322033),new Point(0.3469626168224299, 0.3135593220338983),new Point(0.4030373831775701, 0.34915254237288135),new Point(0.3901869158878505, 0.32372881355932204),new Point(0.3703271028037383, 0.33220338983050846),new Point(0.37149532710280375, 0.3610169491525424),new Point(0.37850467289719625, 0.38813559322033897),new Point(0.39485981308411217, 0.3983050847457627),new Point(0.4077102803738318, 0.423728813559322),new Point(0.39485981308411217, 0.4423728813559322),new Point(0.375, 0.43898305084745765),new Point(0.4287383177570093, 0.26440677966101694),new Point(0.4287383177570093, 0.2983050847457627),new Point(0.42990654205607476, 0.3271186440677966),new Point(0.433411214953271, 0.3610169491525424),new Point(0.43457943925233644, 0.3864406779661017),new Point(0.43457943925233644, 0.4186440677966102),new Point(0.4357476635514019, 0.4440677966101695),new Point(0.46261682242990654, 0.3271186440677966),new Point(0.463785046728972, 0.3593220338983051),new Point(0.463785046728972, 0.3847457627118644),new Point(0.463785046728972, 0.4135593220338983),new Point(0.477803738317757, 0.4322033898305085),new Point(0.49883177570093457, 0.43559322033898307),new Point(0.5128504672897196, 0.41694915254237286),new Point(0.5151869158878505, 0.3898305084745763),new Point(0.5175233644859814, 0.3559322033898305),new Point(0.514018691588785, 0.3254237288135593)];
        //var g = [new Point(0.4, 0.5, 0, 20, "#ed9d33"),new Point(0.6, 0.5, 0, 20, "#fff000")];
        var g = [new Point(0.4, 0.5),  
new Point(0.6, 0.5, 0, 20),  
new Point(0.4905857740585774, 0.6644067796610169),  
new Point(0.5, 0.3271186440677966, 0, 20),  
new Point(0.4299163179916318, 0.34915254237288135),  
new Point(0.4884937238493724, 0.43728813559322033),  
new Point(0.5523012552301255, 0.3847457627118644),  
new Point(0.551255230125523, 0.5830508474576271, 0, 20),  
new Point(0.5010460251046025, 0.5084745762711864),  
new Point(0.4246861924686193, 0.6186440677966102),  
new Point(0.4309623430962343, 0.42203389830508475),  
new Point(0.45397489539748953, 0.5288135593220339),  
new Point(0.4884937238493724, 0.5983050847457627),  
new Point(0.5617154811715481, 0.46779661016949153, 0, 20),  
new Point(0.5052301255230126, 0.37457627118644066),  
new Point(0.38284518828451886, 0.4033898305084746),  
new Point(0.3284518828451883, 0.4847457627118644),  
new Point(0.36297071129707115, 0.5661016949152542),  
new Point(0.3891213389121339, 0.6949152542372882, 0, 20),  
new Point(0.4989539748953975, 0.6966101694915254),  
new Point(0.5732217573221757, 0.6423728813559322),  
new Point(0.6234309623430963, 0.6305084745762712),  
new Point(0.641213389121339, 0.48135593220338985, 0, 20),  
new Point(0.6108786610878661, 0.3525423728813559),  
new Point(0.5125523012552301, 0.23559322033898306),  
new Point(0.46548117154811713, 0.26949152542372884),  
new Point(0.35251046025104604, 0.27627118644067794),  
new Point(0.39435146443514646, 0.32372881355932204, 0, 20),  
new Point(0.3200836820083682, 0.3983050847457627),  
new Point(0.25, 0.5542372881355933),  
new Point(0.3263598326359833, 0.5711864406779661),  
new Point(0.3158995815899582, 0.6644067796610169),  
new Point(0.446652719665272, 0.688135593220339),  
new Point(0.5658995815899581, 0.7186440677966102),  
new Point(0.6569037656903766, 0.7),  
new Point(0.6621338912133892, 0.5423728813559322),  
new Point(0.6830543933054394, 0.3983050847457627, 0, 20),  
new Point(0.6182008368200836, 0.2745762711864407),  
new Point(0.5815899581589958, 0.27796610169491526),  
new Point(0.5700836820083682, 0.21525423728813559),  
new Point(0.2792887029288703, 0.37966101694915255),  
new Point(0.2813807531380753, 0.4610169491525424, 0, 20),  
new Point(0.40481171548117156, 0.23728813559322035),  
new Point(0.6725941422594143, 0.3152542372881356),  
new Point(0.7112970711297071, 0.5186440677966102),  
new Point(0.6893305439330544, 0.6237288135593221, 0, 20),  
new Point(0.28451882845188287, 0.6135593220338983)]; 
        
        var t = [new Target(0.9, 0.1, 0.0, 50, 0.02, "#ed9d33"),
                 new Target(0.9, 0.9, 0.0, 50, 0.02, "#fff000"),
                 new Target(0.1, 0.1, 0.0, 50, 0.02, "#fff000"),
                 new Target(0.1, 0.9, 0.0, 50, 0.02, "#ed9d33")];

		gLength = g.length; 
        startTime = (gLength/4) * 1000;       
		for (var i = 0; i < gLength; i++) {
			g[i].curPos.x = canvasWidth * g[i].curPos.x;
            g[i].curPos.y = canvasHeight * g[i].curPos.y;

            g[i].originalPos.x = g[i].curPos.x;
			g[i].originalPos.y = g[i].curPos.y;
		};

        tLength = t.length;
        for (var i=0; i < tLength; i++){
            t[i].pos.x = canvasWidth * t[i].pos.x;
            t[i].pos.y = canvasHeight * t[i].pos.y;
        }

		pointCollection = new PointCollection();
		pointCollection.points = g;
		pointCollection.targets = t;
        pointCollection.img = img;
        pointCollection.canvasWidth = canvasWidth;
        pointCollection.canvasHeight = canvasHeight;
        
		initEventListeners();
		timeout();
	};

	function initEventListeners() {
		$(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
        $(window).bind('keydown', onKeydown);
        $(window).bind('keyup', onKeyup);

        $(canvas).bind('mousedown', onMousedown);
        $(canvas).bind('mouseup', onMouseup);
		$(img).bind('load', ImageLoaded);

		$(canvas).bind('mousedown', onMousedown);
        $(canvas).bind('mouseup', onMouseup);
		
		canvas.get(0).ontouchmove = function(e) {
			e.preventDefault();
			onMove({
				pageX: e.targetTouches[0].pageX,
				pageY: e.targetTouches[0].pageY
			});
		};

		canvas.get(0).ontouchstart = function(e) {
			e.preventDefault();
			onMousedown({
				pageX: e.targetTouches[0].pageX,
				pageY: e.targetTouches[0].pageY
			});
		};
		
		canvas.get(0).ontouchend = function(e) {
			e.preventDefault();
			onMouseup({
				pageX: e.targetTouches[0].pageX,
				pageY: e.targetTouches[0].pageY
			});
		};
	};

    function onKeydown(e){
        ctrlDown = (e.keyCode == 17);
        if ((e.keyCode == 16) && startDragPos){
            if (pointCollection){
                pLength = pointCollection.points.length;
                var asdf = "";
                for (var i=0; i< pLength; i++){
                    var point = pointCollection.points[i];
                    if (point == null) continue;
                    asdf += "new Point("+(point.curPos.x/canvasWidth) +", "+ (point.curPos.y/canvasHeight) +"), \n";
                }
                alert(asdf);
            }
        }
    }

    function onKeyup(e){
        if (ctrlDown && (e.keyCode == 17))
            ctrlDown = false;
    }

    function onMousedown(e){
        if (ctrlDown){
            if (pointCollection){
                var p = new Point(e.pageX, e.pageY, 0.0, 9, "#ed9d33");
                pointCollection.points.push(p);
            }
            return;
        }

        startDragPos = new Vector(e.pageX, e.pageY);
        var point = pointCollection.findPointOnPos(startDragPos);
        if (point){
            point.loaded = true;
            startDragPos.set(point.curPos.x, point.curPos.y);
        }
    }

    function onMouseup(e){
        var point = pointCollection.findPointOnPos(startDragPos);
        if (point){
            point.loaded = false;
        
            var pos = new Vector(e.pageX, e.pageY);
            var dx = (pos.x - point.curPos.x);
            var dy = (pos.y - point.curPos.y);
            
            var dd = Math.pow(dx,2) + Math.pow(dy,2);
            var d = Math.sqrt(dd);
            if (d < maxShotPower)
            {
                point.travelDirection.x += point.curPos.x - dx/2;
                point.travelDirection.y += point.curPos.y - dy/2;
                point.loaded = false;
                //strokesLable.innerHTML = "Slag: " + (++strokes);

                if (!startTick)
                    startTick = new Date().getTime();
            }
        }
        startDragPos = null;
    }

	function ImageLoaded(){
			imageIsLoaded = true;
			timeout();
	}

	function updateCanvasDimensions() {
		canvas.attr({height: $(window).height(), width: $(window).width()});
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();

		draw();
	};

	function onMove(e) {
		if (pointCollection)
			pointCollection.mousePos.set(e.pageX, e.pageY);
	};

	function onTouchMove(e) {
		if (pointCollection){
            pointCollection.touchMode = true;
			pointCollection.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
        }
	};

    function GetFrameRate(){
        if (frameRate){
            var d = new Date();
            //debug.innerHTML = (d.getTime() - frameRate);
        }
        frameRate = new Date().getTime();
    }
    
	function timeout() {
        GetFrameRate();
        
		if (!imageIsLoaded) return;
		draw();
		update();

		setTimeout(function() { timeout() }, 1);
	};

	function draw() {
		var tmpCanvas = canvas.get(0);

		if (tmpCanvas.getContext == null) {
			return;
		};

		ctx = tmpCanvas.getContext('2d');
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		if (pointCollection){
			pointCollection.draw(ctx);

            if (startDragPos){
                var dd = Math.pow(startDragPos.x - pointCollection.mousePos.x,2) + Math.pow(startDragPos.y - pointCollection.mousePos.y,2);
                var d = Math.sqrt(dd);
                if (d < maxShotPower){
                    ctx.strokeStyle = '#000';
                    ctx.beginPath();
                    ctx.moveTo(startDragPos.x, startDragPos.y);
                    ctx.lineTo(pointCollection.mousePos.x, pointCollection.mousePos.y);
                    ctx.stroke();
                }
            }
            
            return;
            
            if (!startTick) 
                return;
            
            var remainingTime = (startTime - (new Date().getTime() - startTick)) + pointCollection.extraTime;
            if (pointCollection.points.length > 0){ 
                if (remainingTime > 0)                
                    timerLable.innerHTML = "tid igjen: " + remainingTime/1000;
                else{
                    imageIsLoaded = false;
                    timerLable.innerHTML = "Tiden er ute... GAME OVER.";
                    infoLable.innerHTML = "Trykk F5!";
                }
            }
            else {           
                imageIsLoaded = false;
                //debug.innerHTML = "HURRA!!! DU VANT!!!";
                timerLable.innerHTML = "Du har " + remainingTime/1000 + " sekunder til overs,";
                strokesLable.innerHTML = "og brukte bare " + strokes + " slag!";
                infoLable.innerHTML = "Trykk F5 og se om du setter ny pers!";
            }
        }
	};

	function update() {
		if (pointCollection){
			pointCollection.update();
        }
	};
	
	init();
});