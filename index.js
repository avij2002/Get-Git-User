var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
let user_name = document.getElementById("user_name");
let pull_data = document.getElementById("pull_data");
let pers_info = document.getElementById("pers_info");
let name_login = document.getElementById("name_login");
let name_pers = document.getElementById("name");
let login = document.getElementById("login");
let images = document.getElementById("images");
let btn_groups = document.getElementById("btn_groups2");
let repo_list = document.getElementById("repo_list");
let text = document.getElementById("text");

pull_data.addEventListener("click",function(){
  var username = user_name.value;
  get_pers_info(username);
  get_repo_list(username);
})


function get_pers_info(username)
  {
  var url =  `https://api.github.com/users/${username}`;
    request.addEventListener("load",function(event)
  {
     let data = JSON.parse(event.target.responseText);

     console.log(data);
     name_pers.innerText=data.name;
     login.innerText=`(@${data.login})`;
     login.href=data.url;
     images.innerHTML = `<img src="${data.avatar_url}"/>`;
     let follower = document.createElement("p");
     let follow = "Followers: "+data.followers+"-Following: "+data.following+"\n"+"Repos: "+data.public_repos;
     follower.innerText=follow;
     images.appendChild(follower);
     
     
     
    });
    request.open('get',url);
    request.send();
}

function get_repo_list(username)
{
    var url = `https://api.github.com/users/${username}/repos`;
    request2.addEventListener("load",function(event)
    {
          text.innerText="Repo List:"
          let data = JSON.parse(event.target.responseText);
          data.forEach(function(dat)
          {
            let btn = document.createElement("button");
            btn.setAttribute("class","btns");
            btn.href=dat.url;
            btn.innerText=dat.name;
            btn.setAttribute("onclick",`location.href='${dat.url}';`);
            console.log(btn);
            btn_groups.appendChild(btn);
          });
    })
    request2.open("get",url);
    request2.send();
}