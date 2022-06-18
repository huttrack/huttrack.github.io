//const socket = io("192.168.68.124:81/auth")



function login(){
    Swal.fire({
        title: "Login Token",
        text: "Join auth.huttrack.me and type in the code you see.",
        input: 'text',
        showCancelButton: true        
    }).then((result) => {
        if (result.value) {
            socket.emit("auth-1", result.value)
            console.log("Result: " + result.value);
        }
    });
}

var db = false

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

openServer("HutTrack")

function openUser(userid){

}

function missingIcons(servers){
    fetch('items.json')
        .then(response => response.text())
        .then(items => {
            items = JSON.parse(items)
            var missingIcons = []
            for(let i = 0; i < servers.length; i++) {
                let t = servers[i];
                if(t.hasOwnProperty("icon")){
                    if(!items.hasOwnProperty(t.icon)){
                        if(!missingIcons.includes(t.icon)){
                            missingIcons.push(t.icon)
                            missingIcons.push(t.icon+":"+t.name)
                        }
                    }
                }
            }
            console.log(missingIcons)
            $("#icon").attr("src",`data:image/png;base64, ${items["OBSERVER"].icon}`);
    });

}

function openServer(servername){
    if(servername.toUpperCase()=="HUTTRACK"){
        currentserver = "HutTrack";
        $("#m-motd").html("&bHutTrack&f &f~ Find your favourite servers\n&b&nhuttrack.me".replaceColorCodes())
        $("#m-ip").text("huttrack.me")
        $("#m-type").html("<span class='text-e'>Website</span>")
        var tags = ["Website", "Utility", "Stats"]
        var x = ``
        for(let i = 0; i < tags.length; i++) {
            let t = tags[i];
            x+=`<div class="basis-1/3 text-e rounded-full p-1 place-items-center grid">${t}</div>`
        }
        if(x==""){
            x+=`<div class="basis-3/3 text-e rounded-full p-1 place-items-center grid">No categories.</div>`
        }
        $("#m-cat").html(x)
        $("#m-po").text("0")
        $("#m-plan").text("Free")
        $("#m-status").html("<span class='text-e font-bold'>Online</span>")
        $("#m-cpd").text("0 Credits/Day")
        $("#m-po").text(0)
        $("#m-sn").text("HutTrack")
        $("#m-cd").text("Sat Jun 18 2022")
        $("#m-lu").text(new Date(Date.now()).toDateString())
        $("#ot").text("Users")
        fetch('items.json')
        .then(response => response.text())
        .then(items => {
            items = JSON.parse(items)
        
            $("#icon").attr("src",`data:image/png;base64, ${items["OBSERVER"].icon}`);

            
    });
        /**
        
        
        $("#m-motd").html(data.server.motd.replaceColorCodes())
        $("#m-po").text(data.server.playerCount)
        $("#m-mp").text(data.server.maxPlayers)
        $("#m-id").text(data.server._id)
        $("#m-ip").text(data.server.name_lower+".minehut.gg")
        $("#m-plan").text(data.server.activeServerPlan)
        $("#m-cpd").text(`${(Math.round(data.server.credits_per_day * 10) / 10)} Credits/Day`)
         */

    }else{
        fetch('https://api.minehut.com/server/'+servername+'?byName=true').then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(function (data) {
            if(!db){
                $("#searchdata").html(`
                <span id="m-sn" class="text-4xl text-e pr-4 font-bold">HutTrack</span> <span class="basis-1/3 text-2xl text-e "><span class="text-d" id="m-po">%PO%</span> Players online</span>
                <div class="">
                  <span class="text-l text-d ">Created: <span class="text-d font-bold" id="m-cd">Sat Apr 11 2020</span> </span><p>
                </div>
                <div class="">
                  <div id="" type="search" class="flex flex-row space-x-3 form-control flex-auto min-w-0 block px-3 py-1.5 bg-c text-base rounded-lg transition ease-in-out m-0 focus:border-a focus:outline-none pr-3 mb-2" placeholder="Server MOTD" aria-label="Search" aria-describedby="button-addon3">
                    <div class="inline">
                      <img id="icon" class="icon" src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAwFBMVEUAAAD+/v7A9f4ry8BJ1cyz1ttv49yc8u2ioqLW//7E//5vb29Ua2/u//+Li4tOXmAbgnsTWVR7naIviIIgXVkTYV42i4VHkY0xY2AlX1tkm5d9o6JyiYxWcG9EamiJo6IbjolecG+Yo6NocHATDxseGCs8MFYHBwsPDxoNCxMKCg8KChQEBAcQEBgPDRUKChMLCxAGBgkjHTAODhUKChALCxEICAxANFoHBw4DAwULCREHBwkHBwoHBwwKCg0HBw2tCV9hAAAAAXRSTlMAQObYZgAAAbFJREFUOI2VkQtXozAQhdPwEJlIbZKSUEIfmjWCr3Wtb3f9///KCQXF2nXPzumhIfebm8mFkP+rUfv7Th78/cPo6x4ltFv61Tby/h4Eu1wo7ZpDXNHR9iw06hZhGMd7e3Echt1GtOlLkihqZRqP9rFSRGjbB2wDtEiA/Wl6gJWm6BEEGQAZd4B3OfQHpL1DFKHclwfIIbp8zDABmOAm6xwSRDgX/qAQy3czOfVSD+BD5LlqEUpBSl0UEg2GSQmlZgoRDiC1ZlrDwGEDzMpylgsDsoCqmn8GuAfKZFGqfAmor6oK5ADg3oEni6OScwN6Xh2vKi23vhZXs8UR58oAGhyv2BdgmatygWegQ7VCvcBr9lFtghK5n1IJf0Q1L3xQfdQ4o/2BSbYXNVKzudZyOjlx/ZA4o7U8EUKoPDfACi0lnNYOBjk09uzcXgjR5oB1clnXteuz5IY0Vz8b21z/SpZLmMobxxBgjoz7sI3J1rd3zXWCs0zuHx7d+dMzyuPBLQ0e03Br1wbqB/fifmdDtWOy9R9rDVq79/m3CEJuG8Ne3Y7uj1k4ZOO/6h7h7Dt5V70BPD4k7Z5sL/cAAAAASUVORK5CYII=" alt="Server Icon" />
                    </div>
                    <div id="m-motd" class="inline">
      
                    </div>
                  </div>
                </div>
                <div class="flex flex-row space-x-3">
      
                  <div id="m-ip" type="search" class="place-items-center grid basis-1/3 inline text-e underline form-control block px-3 py-1.5 bg-c text-base rounded-lg transition ease-in-out m-0 focus:border-a focus:outline-none pr-3 mb-2" placeholder="Server MOTD" aria-label="Search" aria-describedby="button-addon3">
                  </div>
                  <div id="m-plan" type="search" class="place-items-center grid basis-1/3 inline text-d font-bold form-control block px-3 py-1.5 bg-c text-base rounded-lg transition ease-in-out m-0 focus:border-a focus:outline-none pr-3 mb-2" placeholder="Server MOTD" aria-label="Search" aria-describedby="button-addon3">
      
                  </div>
                  <div id="m-status" type="search" class="place-items-center grid basis-1/3 inline text-e form-control block px-3 py-1.5 bg-c text-base rounded-lg transition ease-in-out m-0 focus:border-a focus:outline-none pr-3 mb-2" placeholder="Server MOTD" aria-label="Search" aria-describedby="button-addon3">
                  </div>
                </div>
                <div class="flex flex-row space-x-3">
                  <div id="m-cpd" type="search" class="place-items-center grid basis-1/4 inline text-expensive font-bold form-control block px-3 py-1.5 bg-c text-base rounded-lg transition ease-in-out m-0 focus:border-a focus:outline-none pr-3 mb-2" placeholder="Server MOTD" aria-label="Search" aria-describedby="button-addon3">
                  </div>
                  <div id="m-cat" type="search" class="flex flex-row space-x-2 basis-1/4 inline font-bold form-control block px-3 py-1.5 bg-c rounded-lg transition ease-in-out m-0 focus:border-a focus:outline-none pr-3 mb-2" placeholder="Server MOTD" aria-label="Search" aria-describedby="button-addon3">
                    <div class="basis-1/3 text-e rounded-full p-1 place-items-center grid">
                      Website
                    </div>
                    <div class="basis-1/3 text-e rounded-full p-1 place-items-center grid">
                      Utility
                    </div>
                    <div class="basis-1/3 text-e rounded-full p-1 place-items-center grid">
                      Stats
                    </div>
                  </div>
                  <div id="m-cpd" type="search" class="place-items-center grid basis-1/4 inline text-expensive form-control block px-3 py-1.5 bg-c text-base rounded-lg transition ease-in-out m-0 focus:border-a focus:outline-none pr-3 mb-2" placeholder="Server MOTD" aria-label="Search" aria-describedby="button-addon3">
                    <span class="text-d">Last up <span class="text-e font-bold" id="m-lu">Sat Apr 12 2020</span> </span>
                  </div>
                  <div id="m-cpd" type="search" class="place-items-center grid basis-1/4 inline text-enchant font-bold form-control block px-3 py-1.5 bg-c text-base rounded-lg transition ease-in-out m-0 focus:border-a focus:outline-none pr-3 mb-2" placeholder="Server MOTD" aria-label="Search" aria-describedby="button-addon3">
                    <span id="m-type">
                      Website
                    </span>
                  </div>
                  <!-- <canvas class="basis-2/3" id="currentServerGraph" width="1000" height="100"></canvas> -->
                </div>
                `)
                db=true
            }
     
            console.log(data)
            currentserver=data.server.name
            $("#ot").text("Players")
            $("#m-sn").text(data.server.name)
            $("#m-cd").text(new Date(data.server.creation).toDateString())
            $("#m-lu").text(new Date(data.server.last_online).toDateString())
            $("#m-motd").html(data.server.motd.replaceColorCodes())
            $("#m-po").text(data.server.playerCount)
            $("#m-mp").text(data.server.maxPlayers)
            $("#m-id").text(data.server._id)
            $("#m-ip").text(data.server.name_lower+".minehut.gg")
            $("#m-plan").text(data.server.activeServerPlan)
            $("#m-cpd").text(`${(Math.round(data.server.credits_per_day * 10) / 10)} Credits/Day`)
            var status = "<span class='text-bad font-bold'>Offline</span>"
            if(data.server.online){
                status="<span class='font-bold'>Online</span>"
            }
            $("#m-status").html(status)
            var x = ``
            for(let i = 0; i < data.server.categories.length; i++) {
                let t = data.server.categories[i];
                x+=`<div class="basis-1/3 text-e rounded-full p-1 place-items-center grid">${t}</div>`
            }
            if(x==""){
                x+=`<div class="basis-3/3 text-e rounded-full p-1 place-items-center grid">No categories.</div>`
            }
            $("#m-cat").html(x)
            if(data.server.proxy){
                $("#m-type").text("Proxy")
            }else{
                $("#m-type").text("Standalone Server")
            }
            fetch('items.json')
                .then(response => response.text())
                .then(items => {
                    items = JSON.parse(items)
                    
                    if(data.server.hasOwnProperty("icon")){
                        console.log(data.server.icon)
                        if(items.hasOwnProperty(data.server.icon)){
                        
                            var icon = items[data.server.icon].icon
                            $("#icon").attr("src",`data:image/png;base64, ${icon}`);
                        }else{
                            new Toast({
                                message: `Error! The server you have selected has a new icon, it has been changed to a clock! (${data.server.icon})`,
                                type: 'danger'
                              });
                            $("#icon").attr("src",`data:image/png;base64, ${items["CLOCK"].icon}`);
                        }
                    }else{
                        $("#icon").attr("src",`data:image/png;base64, ${items["SIGN"].icon}`);
                    }
    
                    
            });
            /**
            cs_chart = new SmoothieChart({grid:{fillStyle:'#0a254a',strokeStyle:'transparent',verticalSections:0,borderVisible:false},labels:{fillStyle:'#21E6C1',fontSize:17},tooltip:true}),
            cs_canvas = document.getElementById('currentServerGraph'),
            cs_series = new TimeSeries();
            cs_chart.addTimeSeries(cs_series, {lineWidth:2,strokeStyle:'#21E6C1'});
            cs_chart.streamTo(cs_canvas, 2500);
             */
            //console.log(cs_chart)
        }).catch(function (err) {
            console.warn('Something went wrong.', err);
        });   
    }
}

//openServer("boxPvPV");

var os_canvas, os_series, os_chart,
op_canvas, op_series, op_chart,
dl_canvas, dl_series, dl_chart,
cs_canvas, cs_series, cs_chart;

var currentserver = "";
var currentserveronline = false
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
                    //cs_series.append(new Date().getTime(), x.playerData.playerCount);
                }
            }
        }
        //console.log(data)
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });  
    //socket.emit("online-users")
}

run()

setInterval(function() {
  run()
}, 2400)
/**
socket.on("online-users", (x) =>{
    $("#ou").text(x)
    if(currentserver=="HutTrack"){
        $("#m-po").text(x)
    }
})
socket.on("auth-1", (x) =>{
    if(!x){
        new Toast({
            message: `Log in failed! If this issue persists, contact an Administrator.`,
            type: 'danger'
          });
    }
})
 */