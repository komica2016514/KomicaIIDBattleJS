var rule = [
  ["ba", "防禦", 2, 3],
  ["ts", "護盾", 1, 2],
  ["dc", "閃避", 50, 75, "%"],
  ["egf", "連擊", 50, 75, 100, "%"],
  ["ih", "暴擊", 75, 100, "%"],
  ["op", "攻擊傷害最小值 +2"],
  ["qr", "攻擊傷害最大值 +2"],
  ["uvw", "無視防禦"],
  ["xyz", "無視護盾"],
  ["jkl", "當對手發動連擊時，給予對手2次3傷害"],
  ["mn", "當對手有暴擊技能時，每回合給予對手2次2傷害"],
  ["0", "每回合結束時，回復1血並且給予對手1傷害"],
  ["1", "每當受到傷害時，回復1血"],
  ["2", "每2回合，50%機率暈眩對手"],
  ["3", "每當受到傷害3以上的攻擊傷害時，給予對手2次2傷害"],
  ["45", "每當受到傷害4以上的攻擊傷害時，給予對手4次5傷害"],
  ["678", "第六回合開始以後，攻擊傷害最小值與最大值+1"],
  ["9", "第九回合結束時，給予對手9次2傷害"]
];

function $nP(str){
  return $(document.createElement("p")).html(str);
}

function calc(){
  var id = $("#komicaID").val().replace(/[^\w\.\/]/gi, "");
  if(id.length != 8){
    $("#idErr").show("clip");
  }else{
    $("#idErr").hide("clip");
    $("#komicaID").val(id);
    $("#o1").hide("clip");
    $("#o2").html("");
    $("hr").show("drop");
    $("#o1").show("clip");
    id = id.toLowerCase();
    for(var d=0; d<id.length-1; d++){
      for(var f=d+1; f<id.length; f++){
        if(id[d] == id[f]){
          id = id.slice(0, f) + id.slice(f-- + 1);
        }
      }
    }
    for(var i=0; i<rule.length; i++){
      var reg = new RegExp("[" + rule[i][0] + "]", "gi"), matched = 0;
      if(rule[i].length > 2){
        var m = id.match(reg), g = -1;
        if(m && m.length > 0){
          for(var x in m){
            var y = rule[i][0].indexOf(m[x]);
            if(y > g) g = y;
          }
          matched = 1;
          $("#o2").append($nP(rule[i][1] + " " + rule[i][g+2] + rule[i].slice(rule[i][0].length + 2).join("")).hide());
        }
      }else{
        for(var h=0; h<id.length; h++){
          if(rule[i][0].indexOf(id[h])>=0){
            matched = 1;
            $("#o2").append($nP(rule[i][1]).hide());
            break;
          }
        }
      }
      if(matched) id = id.replace(reg, "");
      if(id.length <= 0) break;
    }
    $("#o2>p:first-child").effect("slide", {direction: "down"}, slideShow);
  }
}

function slideShow(){
  $(this).next("p").effect("slide", {direction: "down"}, slideShow);
}

function setMainAlgin(){
  $("#main").position({
    my: "center center",
    at: "center center",
    of: window
  });
}

$(document).ready(function(){
  $("hr, #o1, #idErr").hide();
  $("#komicaID").change(calc);
});