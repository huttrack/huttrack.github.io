//openServer("HutTrack")

$("#m-motd").html("&bHutTrack&f &f~ Find your favourite servers\n&b&nhuttrack.github.io".replaceColorCodes())
$("#m-ip").val("HutTrack.minehut.gg")

function search(){
    var nameorid = $("#serversearch").val()
    fetch('https://api.minehut.com/server/'+nameorid+'?byName=true').then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            fetch('https://api.minehut.com/server/'+nameorid).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'A server with that name or ID was not found!',
                        icon: 'error',
                        confirmButtonColor: "#0a254a",
                      })
                }
            }).then(function (data) {
                openServer(data.server.name)
            }).catch(function (err) {
                console.warn('Something went wrong.', err);
            }); 
        }
    }).then(function (data) {
        openServer(data.server.name)
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    }); 
    /**
    for(let i = 0; i < servers.length; i++) {
        let x = servers[i];
        if(x.name == nameorid){
            found=true
            server = x
        }else if(x.staticInfo._id==nameorid){
            found=true
            server = x
        }
    }
    if(found){
        openServer(x.name)
    }else if(!found){
        Swal.fire({
            title: 'Error!',
            text: 'A server with that name or ID was not found!',
            icon: 'error',
            confirmButtonColor: "#071E3D",
          })
        $("#serversearch").val("")
    }
     */
}



function openServer(servername){
    currentserver = servername;

    fetch('https://api.minehut.com/server/'+servername+'?byName=true').then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        $("#searchdata").html(`          <span id="m-sn" class="text-4xl text-e pr-4 font-bold">HutTrack</span> 
        <div class="">
          <span class="text-l text-d ">Created: <span class="text-d font-bold" id="m-cd">Sat Apr 11 2020</span> </span>
        </div>
        <div id="m-motd" type="search" class="basis-3/6 form-control flex-auto min-w-0 block px-3 py-1.5 bg-c text-base rounded-lg transition ease-in-out m-0 focus:border-a focus:outline-none pr-3 mb-2" placeholder="Server MOTD" aria-label="Search" aria-describedby="button-addon3">
        </div>
        <div class="flex flex-row">
          <input id="m-ip" type="search" class="basis-3/6 form-control flex-auto min-w-0 block px-3 py-1.5 text-base text-e bg-c rounded-lg transition ease-in-out m-0 focus:outline-none pr-3 mb-2" placeholder="Server IP" aria-label="Search" aria-describedby="button-addon3" readonly>
        </div>
        <div class="">
          <span class="basis-1/3 text-2xl text-e ">Online Players: <span class="text-d" id="m-po"></span></span>
          <canvas class="basis-2/3" id="currentServerGraph" width="1000" height="100"></canvas>
        </div>
        <div class="flex flex-row">
          <span class="basis-1/3 text-xl text-e ">Server Plan: <span id="m-plan" class="text-d"></span></span>
          <span class="basis-1/3 text-xl text-e ">Server Status: <span id="m-status" class="text-d"></span></span>
          <span class="basis-1/3 text-xl text-e ">Server Icon: <span id="m-icon" class="text-d"></span></span>
        </div>`)
        console.log(data)
        cs_canvas, cs_series, cs_chart = null
        currentserver=data.server.name
        $("#m-sn").text(data.server.name)
        $("#m-cd").text(new Date(data.server.creation).toDateString())
        $("#m-motd").html(data.server.motd.replaceColorCodes())
        $("#m-po").val(data.server.playerCount)
        $("#m-mp").text(data.server.maxPlayers)
        $("#m-id").text(data.server._id)
        $("#m-ip").val(data.server.name_lower+".minehut.gg")
        $("#m-plan").text(data.server.activeServerPlan)
        var status = "Offline"
        if(data.server.online){
            status="Online"
        }
        $("#m-status").text(status)
        $("#m-icon").text(data.server.icon)
        cs_chart = new SmoothieChart({grid:{fillStyle:'#0a254a',strokeStyle:'transparent',verticalSections:0,borderVisible:false},labels:{fillStyle:'#21E6C1',fontSize:17},tooltip:true}),
        cs_canvas = document.getElementById('currentServerGraph'),
        cs_series = new TimeSeries();
        cs_chart.addTimeSeries(cs_series, {lineWidth:2,strokeStyle:'#21E6C1'});
        cs_chart.streamTo(cs_canvas, 2500);
        //console.log(cs_chart)
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });   
}

//openServer("boxPvPV");

var os_canvas, os_series, os_chart,
op_canvas, op_series, op_chart,
dl_canvas, dl_series, dl_chart,
cs_canvas, cs_series, cs_chart;

var currentserver = "";
var servers;


$(document).ready(function(){
    document.getElementById('serversearch').addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("serversearchbutton").click();
        }
      }); 
    
    /**
    os_chart = new SmoothieChart({grid:{fillStyle:'#071E3D',strokeStyle:'transparent',verticalSections:0,borderVisible:false},labels:{fillStyle:'#21E6C1',fontSize:17},tooltip:true}),
    os_canvas = document.getElementById('onlineserversg'),
    os_series = new TimeSeries();
    os_chart.addTimeSeries(os_series, {lineWidth:2,strokeStyle:'#21E6C1'});
    os_chart.streamTo(os_canvas, 1600);

    var parent = os_canvas.parentNode,
    styles = getComputedStyle(parent),
    w = parseInt(styles.getPropertyValue("width"), 10),
    h = parseInt(styles.getPropertyValue("height"), 10);

    os_canvas.width = w;
    os_canvas.height = h;
    
    op_chart = new SmoothieChart({grid:{fillStyle:'#071E3D',strokeStyle:'transparent',verticalSections:0,borderVisible:false},labels:{fillStyle:'#21E6C1',fontSize:17},tooltip:true}),
    op_canvas = document.getElementById('onlineplayersg'),
    op_series = new TimeSeries();
    op_chart.addTimeSeries(op_series, {lineWidth:2,strokeStyle:'#21E6C1'});
    op_chart.streamTo(op_canvas, 1600);
    
    var parent = op_canvas.parentNode,
    styles = getComputedStyle(parent),
    w = parseInt(styles.getPropertyValue("width"), 10),
    h = parseInt(styles.getPropertyValue("height"), 10);

    op_canvas.width = w;
    op_canvas.height = h;

    dl_chart = new SmoothieChart({grid:{fillStyle:'#071E3D',strokeStyle:'transparent',verticalSections:0,borderVisible:false},labels:{fillStyle:'#21E6C1',fontSize:17},tooltip:true}),
    dl_canvas = document.getElementById('apidelayg'),
    dl_series = new TimeSeries();
    dl_chart.addTimeSeries(dl_series, {lineWidth:2,strokeStyle:'#21E6C1'});
    dl_chart.streamTo(dl_canvas, 1600);

    var parent = dl_canvas.parentNode,
    styles = getComputedStyle(parent),
    w = parseInt(styles.getPropertyValue("width"), 10),
    h = parseInt(styles.getPropertyValue("height"), 10);

    dl_canvas.width = w;
    dl_canvas.height = h;
     */
    
})

function run(){
    var s = performance.now()
    fetch('https://api.minehut.com/servers').then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        var delay = performance.now()-s
        $("#online-servers").text(data.total_servers)
        $("#online-players").text(data.total_players)
        $("#online-players").text(data.total_players)
        $("#api-delay").text(delay)
        //os_series.append(new Date().getTime(), data.total_servers);
        //op_series.append(new Date().getTime(), data.total_players);
        //dl_series.append(new Date().getTime(), delay);
        x = data.servers
        servers = data.servers
        var top20 = x.sort(function(a, b) { return a.playerData.playerCount < b.playerData.playerCount ? 1 : -1; })
                .slice(0, 20);
        var t20 = ""
        y = 1;
        for(let i = 0; i < top20.length; i++) {
            let x = top20[i];
            t20+=`
            <span onclick='openServer("${x.name}")'>#${y}: <span class="hover:underline cursor-pointer">${x.name}</span>, ${x.playerData.playerCount}</span><p>`
            y+=1
        }
        $("#topservers").html(t20)
        if(currentserver!=""){
            for(let i = 0; i < data.servers.length; i++) {
                let x = data.servers[i];
                if(x.name == currentserver){
    
                    $("#m-po").text(x.playerData.playerCount)
                    cs_series.append(new Date().getTime(), x.playerData.playerCount);
                }
            }
        }
        //console.log(data)
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });  
}

run()

setInterval(function() {
  run()
}, 2400)

