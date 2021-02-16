document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#courseform-view').addEventListener('click', courseForm);

    allCourses()
});



function courseForm(){
    document.querySelector('#course-list').style.display = 'none'; 
    document.querySelector('#courseform-view').style.display = 'block';
    document.querySelector('#user-register').style.display = 'none';
    document.querySelector('#course-view').style.display = 'none'; 
    document.querySelector('#eclassform-view').style.display = 'none'; 
    document.querySelector('#myCourses').style.display = 'none'; 
}


function createCourse(){
    let grade = document.querySelector('#course-grade').value;
    let name = document.querySelector('#course-name').value;
    let time = document.querySelector('#course-hours').value;
    let description = document.querySelector('#course-description').value;
    
    fetch('/create-course', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({     
            grade: grade,    
            name: name,
            time: time,
            description: description,
        })        
    })   
}


function allCourses(){
    document.querySelector('#course-list').style.display = 'block';
    document.querySelector('#courseform-view').style.display = 'none';  
    document.querySelector('#course-view').style.display = 'none';
    document.querySelector('#eclassform-view').style.display = 'none'; 
    document.querySelector('#myCourses').style.display = 'none'; 

    fetch('courses')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let coursetable = document.createElement('table');
            coursetable.id = 'coursetable-id';
            document.querySelector('#course-list').appendChild(coursetable);
            headrow = `
            <thead>
                <tr style='font-weight: bold'>
                    <td>Grade</td>
                    <td>Name</td>
                    <td>Teacher</td> 
                </tr>
            </thead>
            `
            if (data.length ===0){
            coursetable.innerHTML = '';
            } else {
            coursetable.innerHTML = headrow;
            document.querySelector('#course-list').appendChild(coursetable);
            } 
            
            data.forEach(function(course){
                let tablebody = document.createElement('tbody');
                tablebody.id = 'tablebody-id';                
                tablebody.innerHTML = `
                <tr id='${course.courseID}' onclick='courseDetail("${course.courseID}")'>
                    <td>${course.grade}</td>
                    <td>${course.name}</td>
                    <td>${course.teacher}</td>                 
                </tr>    
                `
                document.querySelector('#coursetable-id').appendChild(tablebody);
            })
    })
}


function courseDetail(courseID){
    document.querySelector('#course-list').style.display = 'none'; 
    document.querySelector('#courseform-view').style.display = 'none';  
    document.querySelector('#course-view').style.display = 'block'; 
    document.querySelector('#eclassform-view').style.display = 'none'; 

    fetch(`courses/${courseID}`)
    .then(res => res.json())
    .then(course => {
        console.log(course);    
        let coursedetail = document.createElement('div'); 
        coursedetail.id = 'coursedetail-id';
        coursedetail.innerHTML = `
        <p>Course ID: ${course.courseID}</p>
        <p>Course Name: ${course.name}</p>
        <p>Grade: ${course.grade}</p>
        <p>Teacher: ${course.teacher}</p>
        <p>Required Hours: ${course.time}</p>
        <p>Course Summary: ${course.description}</p>\n\n
        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <button type="button" class="btn btn-primary" onclick='eclassForm("${course.courseID}")' style='font-weight: bold'>
                Create Eclasses
            </button>

            <button type="button" class="btn btn-secondary" onclick='selectCourse("${course.courseID}")' style='font-weight: bold'>
                Add to your courses
            </button>            
        </div>
        `;
        document.querySelector('#course-view').appendChild(coursedetail);

    })
}



function eclassForm(courseID){
    document.querySelector('#course-list').style.display = 'none'; 
    document.querySelector('#courseform-view').style.display = 'none';
    document.querySelector('#course-view').style.display = 'none'; 
    document.querySelector('#eclassform-view').style.display = 'block'; 
    

    let eclassform = document.createElement('form');
    eclassform.id = "eclassform";
    eclassform.innerHTML = `
    <div class="form-group">
        <label for="eclass-courseID">Course ID</label>
        <input type="text" id="eclass-courseID" class="form-control" name="title" value='${courseID}'/>
    </div>
    <div class="form-group">
        <label for="eclass-name">Name of Eclass</label>
        <input type="text" id="eclass-name" class="form-control" name="title" />
    </div>

    <div class="form-group">
        <label for="eclass-description">Course Description</label>
        <textarea rows="10" id="eclass-description" class="form-control" name="content" ></textarea>
    </div>
    <input type="submit" onclick='createEclass()'  value="Create">  
    `
    document.querySelector('#eclassform-view').appendChild(eclassform);    
}



function createEclass(){
    let courseID = document.querySelector('#eclass-courseID').value;
    let name = document.querySelector('#eclass-name').value;
    let description = document.querySelector('#eclass-description').value;
    
    fetch('/create-eclass', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({     
            courseID: `${courseID}`,    
            name: name,
            description: description,
        })        
    })   
}


function myCourses(){
    document.querySelector('#course-list').style.display = 'none'; 
    document.querySelector('#courseform-view').style.display = 'none';  
    document.querySelector('#course-view').style.display = 'none';
    document.querySelector('#eclassform-view').style.display = 'none'; 
    document.querySelector('#myCourses').style.display = 'block'; 

    fetch('mycourses')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let mycoursetable = document.createElement('table');
            mycoursetable.id = 'mycoursetable-id';
            document.querySelector('#myCourses').appendChild(mycoursetable);
            headrow = `
            <thead>
                <tr style='font-weight: bold'>
                    <td>Grade</td>
                    <td>Name</td>
                    <td>Teacher</td> 
                </tr>
            </thead>
            `
            if (data.length ===0){
            mycoursetable.innerHTML = '';
            } else {
            mycoursetable.innerHTML = headrow;
            document.querySelector('#myCourses').appendChild(mycoursetable);
            } 
            
            data.forEach(function(course){
                let mycoursetablebody = document.createElement('tbody');
                mycoursetablebody.id = 'mycoursetablebody-id';                
                mycoursetablebody.innerHTML = `
                <tr id='${course.courseID}' onclick='courseDetail("${course.courseID}")'>
                    <td>${course.grade}</td>
                    <td>${course.name}</td>
                    <td>${course.teacher}</td>                 
                </tr>    
                `
                document.querySelector('#mycoursetable-id').appendChild(mycoursetablebody);
            })
        
    })
}


function selectCourse(courseID){    
    fetch(`/selectcourse`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({     
            courseID: `${courseID}`,    
        })        
    })   
}




// function allPosts(){
//     document.querySelector('#compose-view').style.display = 'none';
//     document.querySelector('#userProfile').style.display = 'none';    
//     document.querySelector('#allposts').style.display = 'block';  
//     document.querySelector('#follow-form').style.display = 'none';
//     document.querySelector('#myfollowing').style.display = 'none';
//     document.querySelector('#allposts-paging').style.display = 'block';
//     document.querySelector('#userProfile-paging').style.display = 'none';
//     document.querySelector('#myfollowing-paging').style.display = 'none';
    
//     fetch(`/posts/all`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         let arrayList = [];
//         data.forEach(function(post){
//             output = `
//             <div>
//                 <h4>${post.title}</h4>  
//                 <p onclick='userProfile("${post.username}")'>By ${post.username} on ${post.date_created}</p>
//                 <textarea rows="5" class="form-control" name="content" >${post.content}</textarea>
//                 <table>
//                     <tr>
//                         <td id='${post.title}' onclick='likeTogle("${post.title}")'>${post.preference}</td>
//                         <td><i style="font-size:24px" class="fa">&#xf087;</i></td>
//                         <td> ${post.count_like}</td>                       
//                         <td> <i style="font-size:24px" class="fa">&#xf165;</i></td>
//                         <td> ${post.count_unlike}</td>    
//                         <td onclick='editPost(${post.id})'>Edit</td>                    
//                     </tr>
//                 </table>
//             </div>
//             `
//             element = document.createElement('div');
//             element.innerHTML = output;   
//             arrayList.push(element);     
//         })  
//         let page = 0;        
//         let pp = 2;
//         let numPage = Math.ceil(arrayList.length/pp);

//         for (i = 0; i < (page + pp); i++){
//             document.querySelector('#pagingTask').appendChild(arrayList[i])
//         }
//         document.querySelector('#allposts-first').addEventListener('click', () => {
//             page = 0;
//             document.querySelector('#pagingTask').innerHTML = '';
//             for (i = page; i < (page + pp); i++){
//                 document.querySelector('#pagingTask').appendChild(arrayList[i]);
//             }
//         })

//         document.querySelector('#allposts-next').addEventListener('click', () => {
//             if (page < numPage-2){
//                 document.querySelector('#pagingTask').innerHTML = '';
//                 for (i = (page+1)*pp; i < pp*(page+2); i++){
//                     document.querySelector('#pagingTask').appendChild(arrayList[i]);}
//                     page += 1;
//             } else {
//                 page = (numPage-1);
//                 remaining = arrayList.length - page*pp;
//                 document.querySelector('#pagingTask').innerHTML = '';
//                 for (i = page*pp; i < page*pp+remaining; i++){
//                     document.querySelector('#pagingTask').appendChild(arrayList[i]);
//                     }
//             }
//         })

//         document.querySelector('#allposts-previous').addEventListener('click', () => {
//             page == 0 ? (page = 0) : (page -= 1);
//             document.querySelector('#pagingTask').innerHTML = '';
//             for (i = (page)*pp; i < (page+1)*pp; i++){
//                 document.querySelector('#pagingTask').appendChild(arrayList[i]);
//             }
//         })

//         document.querySelector('#allposts-last').addEventListener('click', () => {
//             page = (numPage-1);
//             remaining = arrayList.length - page*pp;
//             document.querySelector('#pagingTask').innerHTML = '';
//             for (i = page*pp; i < page*pp+remaining; i++){
//                 document.querySelector('#pagingTask').appendChild(arrayList[i]);
//             }
//         })
//     })
// }


// function myFollowing(){
//     document.querySelector('#compose-view').style.display = 'none';
//     document.querySelector('#userProfile').style.display = 'none';    
//     document.querySelector('#allposts').style.display = 'none';  
//     document.querySelector('#follow-form').style.display = 'none';
//     document.querySelector('#myfollowing').style.display = 'none';
//     document.querySelector('#allposts-paging').style.display = 'none';
//     document.querySelector('#userProfile-paging').style.display = 'none';
//     document.querySelector('#myfollowing-paging').style.display = 'block';
//     document.querySelector('#following-posts').style.display = 'block';
    
    
//     fetch(`myFollowing`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         let arrayList = [];
//         data.forEach(function(post){
//             output = `
//             <div>
//                 <h4>${post.title}</h4>  
//                 <p onclick='userProfile("${post.username}")'>By ${post.username} on ${post.date_created}</p>
//                 <textarea rows="5" class="form-control" name="content" >${post.content}</textarea>
//                 <table>
//                     <tr>
//                         <td id='${post.title}' onclick='likeTogle("${post.title}")'>${post.preference}</td>
//                         <td><i style="font-size:24px" class="fa">&#xf087;</i></td>
//                         <td> ${post.count_like}</td>                       
//                         <td> <i style="font-size:24px" class="fa">&#xf165;</i></td>
//                         <td> ${post.count_unlike}</td>                        
//                     </tr>
//                 </table>
//             </div>
//             `
//             element = document.createElement('div');
//             element.innerHTML = output;   
//             arrayList.push(element);     
//         })  
//         let page = 0;        
//         let pp = 2;
//         let numPage = Math.ceil(arrayList.length/pp);

//         for (i = 0; i < (page + pp); i++){
//             document.querySelector('#following-page').appendChild(arrayList[i])
//         }
//         document.querySelector('#myfollowing-first').addEventListener('click', () => {
//             page = 0;
//             document.querySelector('#following-page').innerHTML = '';
//             for (i = page; i < (page + pp); i++){
//                 document.querySelector('#following-page').appendChild(arrayList[i]);
//             }
//         })

//         document.querySelector('#myfollowing-next').addEventListener('click', () => {
//             if (page < numPage-2){
//                 document.querySelector('#following-page').innerHTML = '';
//                 for (i = (page+1)*pp; i < pp*(page+2); i++){
//                     document.querySelector('#following-page').appendChild(arrayList[i]);}
//                     page += 1;
//             } else {
//                 page = (numPage-1);
//                 remaining = arrayList.length - page*pp;
//                 document.querySelector('#following-page').innerHTML = '';
//                 for (i = page*pp; i < page*pp+remaining; i++){
//                     document.querySelector('#following-page').appendChild(arrayList[i]);
//                     }
//             }
//         })

//         document.querySelector('#myfollowing-previous').addEventListener('click', () => {
//             page == 0 ? (page = 0) : (page -= 1);
//             document.querySelector('#following-page').innerHTML = '';
//             for (i = (page)*pp; i < (page+1)*pp; i++){
//                 document.querySelector('#following-page').appendChild(arrayList[i]);
//             }
//         })

//         document.querySelector('#myfollowing-last').addEventListener('click', () => {
//             page = (numPage-1);
//             remaining = arrayList.length - page*pp;
//             document.querySelector('#following-page').innerHTML = '';
//             for (i = page*pp; i < page*pp+remaining; i++){
//                 document.querySelector('#following-page').appendChild(arrayList[i]);
//             }
//         })
//     })
// }


// function userProfile(username){
//     document.querySelector('#compose-view').style.display = 'none';
//     document.querySelector('#allposts').style.display = 'none';
//     document.querySelector('#userProfile').style.display = 'block';
//     document.querySelector('#myfollowing').style.display = 'none';
//     document.querySelector('#allposts-paging').style.display = 'none';
//     document.querySelector('#userProfile-paging').style.display = 'block';

//     fetch(`/userFriendship/${username}`)
//     .then(res => res.json())
//     .then(result => {
//         console.log(result)
//         output = ` 
//         <table>
//             <tr>
//                 <td>Followers: ${result.followers__count}</td>
//                 <td>Leaders: ${result.username__count}</td>
//             </tr>
//         </table>
//         `
//         myfriend = document.createElement('div');
//         myfriend.innerHTML = output;
//         document.querySelector('#userInfo').appendChild(myfriend);
//     })

//     fetch(`users/${username}`)
//     .then(res => res.json())
//     .then(user => {
//         console.log(user)        
//         output = ` 
//         <table>
//             <tr>
//                 <td style="font-size:20px; font-weight:bold; text-decoration: underline">${user.username}</td>
//                 <td id='${username}' onclick='friendshipTogle("${username}")'>Follow</td>
//             </tr>
//         </table>
//         `
//         userInfo = document.createElement('div');
//         userInfo.innerHTML = output;
//         document.querySelector('#userInfo').appendChild(userInfo);
//     })

//     fetch(`/posts/users/${username}`)
//     .then(res => res.json())
//     .then(data => {
//         let arrayList = [];
//         data.forEach(function(post){
//             output = `
//             <div>
//                 <h4>${post.title}</h4>  
//                 <p>${post.date_created}</p>
//                 <textarea rows="5" class="form-control" name="content" >${post.content}</textarea>
//                 <table>
//                     <tr>
//                         <td id='${post.title}' onclick='likeTogle("${post.title}")'>${post.preference}</td>
//                         <td><i style="font-size:24px" class="fa">&#xf087;</i></td>
//                         <td> ${post.count_like}</td>
//                         <td> <i style="font-size:24px" class="fa">&#xf165;</i></td>                        
//                         <td> ${post.count_unlike}</td>
//                         <td onclick='editPost(${post.id})'>Edit</td>    
//                     </tr>
//                 </table>
//             </div>
//             `
//             element = document.createElement('div');
//             element.innerHTML = output;   
//             arrayList.push(element);    
//         })    
//         let page = 0;
//         for (i = 0; i < page+ 2; i++){
//             document.querySelector('#postInfo').appendChild(arrayList[i])
//         }  
        
//         document.querySelector('#userProfile_first').addEventListener('click', () => {
//             page = 0;
//             document.querySelector('#postInfo').innerHTML = '';
//             for (i = page; i < page+2; i++){
//                 document.querySelector('#postInfo').appendChild(arrayList[i]);
//             }
//         })

//         document.querySelector('#userProfile_next').addEventListener('click', () => {
//             page == arrayList.length - 2 ? (page = 0) : (page += 2);
//             document.querySelector('#postInfo').innerHTML = '';
//             for (i = page; i < page+2; i++){
//                 document.querySelector('#postInfo').appendChild(arrayList[i]);
//             }
//         })

//         document.querySelector('#userProfile_previous').addEventListener('click', () => {
//             page == 0 ? (page = arrayList.length - 2) : (page -= 2);
//             document.querySelector('#postInfo').innerHTML = '';
//             for (i = page; i < page+2; i++){
//                 document.querySelector('#postInfo').appendChild(arrayList[i]);
//             }
//         })

//         document.querySelector('#userProfile_last').addEventListener('click', () => {
//             page = arrayList.length-2;
//             document.querySelector('#postInfo').innerHTML = '';
//             for (i = page; i < page+2; i++){
//                 document.querySelector('#postInfo').appendChild(arrayList[i]);
//             }
//         })
//     })


// }


// function like(post_title){
//     fetch(`liking/${post_title}`, {
//         method: 'PUT',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             // post: `${post_title}`,
//             preference: 'Like',
//         })
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
// }

// function unlike(post_title){
//     fetch(`unliking/${post_title}`, {
//         method: 'PATCH',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             preference: 'Unlike',
//         })
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
// }


// function likeTogle(post_title){
//     if (document.querySelector(`#${post_title}`).innerHTML==='Like'){
//         like(`${post_title}`);
//         document.querySelector(`#${post_title}`).innerHTML = 'UnLike';
//     } else {
//         unlike(`${post_title}`);
//         document.querySelector(`#${post_title}`).innerHTML = 'Like'
//     }
// }


// function editPost(post_id){
//     document.querySelector('#compose-view').style.display = 'none';
//     document.querySelector('#userProfile').style.display = 'none';    
//     document.querySelector('#allposts').style.display = 'none';  
//     document.querySelector('#follow-form').style.display = 'none';
//     document.querySelector('#myfollowing').style.display = 'none';
//     document.querySelector('#edit-view').style.display = 'block';
//     document.querySelector('#allposts-paging').style.display = 'none';
//     document.querySelector('#userProfile-paging').style.display = 'none';
//     document.querySelector('#myfollowing-paging').style.display = 'none';
    
//     fetch(`updatePost/posts/${post_id}`)
//     .then(res => res.json())
//     .then(post => {
//         console.log(post);
//             output = `
//             <div>
//                 <h4>Edit Content</h4>  
//                 <textarea id='editContent' rows="5" class="form-control" name="content" >${post.content}</textarea>
//                 <input id="editPost" type="submit" onclick='updateContent(${post.id})' value='Save' class="btn btn-primary"/>
//             </div>
//             `
//             // console.log(output);
//             element = document.createElement('div');
//             element.innerHTML = output;
//             document.querySelector('#edit-view').appendChild(element);       
//     })
// }


// function updateContent(post_id){
//     let content = document.querySelector('#editContent').value;
//     fetch(`updatePost/posts/${post_id}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             content: content,
//         }),
//       })
//     allPosts();
// }


// function friendshipTogle(username){
//     if (document.querySelector(`#${username}`).innerHTML==='Follow'){
//         follow(username);
//         document.querySelector(`#${username}`).innerHTML = 'UnFollow';
//     } else {
//         unfollow(username);
//         document.querySelector(`#${username}`).innerHTML = 'Follow'
//     }
// }


// function follow(username){
//     fetch('/makefriendship', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             followers: `${username}`,
//         })
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
// }


// function unfollow(username){
//     fetch('/makefriendship', {
//         method: 'DELETE',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             followers: `${username}`,
//         })
//     })
// }

