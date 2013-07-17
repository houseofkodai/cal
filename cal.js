/*!

  2013 JUL 17 Karthik Ayyar <karthik@houseofkodai.in>

  usage:
    * include script in head and instanstiate in end of body
    * cal.set("input-element-id");

  description:
    minimal self-contained javascript/css for a calendar
    * AMD module

  notes:
    * works, but im not very comfortable on use of class-instance attributes
    *   could have bugs because of that
    * not tested in all browsers - only chrome/firefox

  version:
    1.0

  license: MIT license
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.cal = factory();
  }
}(this, function () {
  return {
    divdate: null,
    ymd: null,
    div: null,
    inputid: null,

    update: function() {
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      divdate.setDate(1); //iterate from 1st day of month
      var m = divdate.getMonth();
      var table = ['<table><tr><th>&lt;</th><th colspan="5" style="text-align:center;">' + months[m] + ' ' + divdate.getFullYear() + '</th><th>&gt;</th></tr><tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr><tr>'];
      //first-row fill empty-cells upto d.getDay
      var i;
      for (i=0; i < divdate.getDay(); i++) {table.push('<td></td>')};
      //rows 2-4/5
      while (divdate.getMonth() == m) {
        //console.log("update "+ymd[1]+"/"+divdate.getMonth()+" "+(ymd[1]==divdate.getMonth()));
        if ((ymd[2] == divdate.getDate()) && (ymd[1] == divdate.getMonth()) && (ymd[0] == divdate.getFullYear())) {
          table.push('<td class="caltoday">' + divdate.getDate() + '</td>');
        } else {
          table.push('<td>' + divdate.getDate() + '</td>');
        };
        //if last day of week - add new row
        if (divdate.getDay() % 7 == 6) {table.push('</tr><tr>');};
        divdate.setDate(divdate.getDate()+1);
      };
      //last-row fill empty-cells
      for (i=divdate.getDay(); i < 7; i++) {table.push('<td></td>')};
      table.push('</tr></table>');
      div.innerHTML = table.join('');
      //reset divdate to previous month
      // one day is not sufficient - as previous/next-month can get tangled with 31/30/29/28 days
      divdate.setDate(divdate.getDate()-7);
    },

    show: function() {
      var elinput = document.getElementById(this.inputid);
      var top=0, left=0;
      var obj = elinput;
      while (obj) {
        left += obj.offsetLeft;
        top += obj.offsetTop;
        obj = obj.offsetParent;
      };
      div.style.left = left + "px";
      div.style.top = (top + elinput.offsetHeight) + "px";
      div.style.display = "block";
      divdate = new Date();
      if (elinput.value) {
        //parse date format as required.
        var dparts = elinput.value.split("/");
        if (3 == dparts.length) {
          dparts[1] -= 1; //month is 0 offset
          if (dparts[2] < 100) dparts[2] = parseInt(dparts[2]) + 2000;
          var d = new Date(dparts[2], dparts[1], dparts[0]);
          if (!isNaN(d)) {
            divdate = d;
          };
        };
      };
      ymd = [divdate.getFullYear(), divdate.getMonth(), divdate.getDate()];
      this.update();
    },

    init: function(ths) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = "\
  .cal {position:absolute; display:none; width:auto; cursor:hand; cursor:pointer; font-family:Courier; background-color:#f0f0f0; border:1px solid #444; padding:.5em;}\
  .cal td {text-align:right;}\
  .caltoday, .cal td:hover { background-color: #444; color: #f0f0f0; }";
      var head = document.getElementsByTagName('head')[0];
      head.insertBefore(style, head.firstChild);

      div = document.createElement('div');
      div.setAttribute('id', 'random'+ Math.round(Math.random() * 100));
      div.className="cal";
      var body = document.getElementsByTagName("body")[0];
      body.insertBefore(div, body.firstChild);

      divdate = new Date();
      ymd = [divdate.getFullYear(), divdate.getMonth(), divdate.getDate()];
      div.onclick = function(e) {
        if (e.target) {
          var data = e.target.innerHTML;
          if ("&lt;" == data) {
            divdate.setMonth(divdate.getMonth()-1);
            ths.update();
          } else if ("&gt;" == data) {
            divdate.setMonth(divdate.getMonth()+1);
            ths.update();
          } else {
            div.style.display = "none";
            if (e.target.nodeName == 'TD') {
              dd = parseInt(data); //NaN for empty td
              if (dd)
                //change date-format as required.
                document.getElementById(ths.inputid).value = parseInt(data) + "/" + (divdate.getMonth()+1) + "/" + divdate.getFullYear();
            };
          };
        };
      };

      onmousewheel = function(e) {
        if (!e) e = window.e;
        var delta = 0;
        if (e.wheelDelta) {
          delta = e.wheelDelta/60;
        } else {
          delta = -e.detail/2;
        };
        if (delta > 0) {
          divdate.setMonth(divdate.getMonth()-1);
        } else {
          divdate.setMonth(divdate.getMonth()+1);
        };
        ths.update();
      };
      if (window.addEventListener) {
        document.addEventListener('DOMMouseScroll', onmousewheel, false);
      } else {
        el.onmousewheel = onmousewheel;
      };
    },

    set: function(id) {
      var el = document.getElementById(id);
      if (!el) return; //If the input field is not there, exit.
      var ths = this;
      el.onclick = function() {
        ths.inputid = this.id;
        ths.show();
      };
      if (!parent.div) this.init(ths);
    },
  };
}));
