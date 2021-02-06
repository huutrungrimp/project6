document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#course-form').addEventListener('click', courseForm);
    document.querySelector('#createCourse').addEventListener('click', createCourse);  

    welcome();
    courseList();
});

function welcome(){
    document.querySelector('#welcome').style.display = 'block';
    document.querySelector('#user-register').style.display = 'block';
    document.querySelector('#course-form').style.display = 'none';
    document.querySelector('#course-list').style.display = 'none';
    document.querySelector('#course-detail').style.display='none';
    
    
}


function courseForm(){
    document.querySelector('#welcome').style.display = 'none';
    document.querySelector('#course-form').style.display = 'block';
    document.querySelector('#user-register').style.display = 'none';
    document.querySelector('#course-detail').style.display='none';

}


function createCourse(e){
    e.preventDefault();

    let name = document.querySelector('#course-name').value;
    let credit = document.querySelector('#course-credit').value;
    let courseID = document.querySelector('#courseID').value;
    let description = document.querySelector('#course-description').value;
    
    fetch('/create-course', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({            
            name: name,
            credit: credit,
            description: description,
            course_type: course_type,
            courseID: courseID,
        })        
    })   
}



function courseList(){
    document.querySelector('#welcome').style.display = 'none';
    document.querySelector('#user-register').style.display = 'none';
    document.querySelector('#course-form').style.display = 'none';
    document.querySelector('#course-list').style.display = 'block';
    document.querySelector('#course-detail').style.display='none';

    fetch('courses')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let coursetable = document.createElement('table');
            coursetable.id = 'coursetable-id';
            coursetable.className = 'coursetable-class';
            document.querySelector('#course-list').appendChild(coursetable);
            headrow = `
            <thead>
                <tr id='head-table-id'>
                    <td class="d-inline-block col-2">CourseID</td>
                    <td class="d-inline-block col-1">Section</td>
                    <td class="d-inline-block col-7">Name</td>
                    <td class="d-inline-block col-1">Credit</td>
                    <td class="d-inline-block col-1">Course Type</td> 
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
                <tr id='course${course.id}' onclick='getCourse("${course.courseID}${course.section}")'>
                    <td class="d-inline-block col-2">${course.courseID}</td>
                    <td class="d-inline-block col-1">${course.section}</td>
                    <td class="d-inline-block col-7">${course.name}</td>
                    <td class="d-inline-block col-1">${course.credits}</td>
                    <td class="d-inline-block col-1">${course.course_type}</td>                      
                </tr>    
                `
                document.querySelector('#coursetable-id').appendChild(tablebody);
                document.querySelector(`#course${course.id}`).style.borderBottom = 'thin solid rgb(100, 107, 105)'
            })
    })
}



function timeTable(){
    document.querySelector('#welcome').style.display = 'none';
    document.querySelector('#user-register').style.display = 'none';
    document.querySelector('#course-form').style.display = 'none';
    document.querySelector('#course-list').style.display = 'none';
    document.querySelector('#course-detail').style.display='none';
    document.querySelector('#timetable').style.display='block';

    fetch('timetable')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let tt_table = document.createElement('table');
            tt_table.id = 'tt_table-id';
            tt_table.className = 'timetable-class';
            document.querySelector('#timetable').appendChild(tt_table);
            headrow = `
            <thead>
                <tr id='head-table-id' class="row">
                    <td class="d-inline-block col-2">CourseID</td>
                    <td class="d-inline-block col-2">Date Start</td>
                    <td class="d-inline-block col-2">Date End</td>
                    <td class="d-inline-block col-2">Day</td>
                    <td class="d-inline-block col-2">Period</td> 
                    <td class="d-inline-block col-2">Teacher</td> 
                </tr>
            </thead>
            `
            if (data.length ===0){
                tt_table.innerHTML = '';
            } else {
                tt_table.innerHTML = headrow;
            document.querySelector('#timetable').appendChild(tt_table);
            } 
            
            data.forEach(function(course){
                let tt_tablebody = document.createElement('tbody');
                tt_tablebody.id = 'tt_tablebody-id';                
                tt_tablebody.innerHTML = `
                <tr id='tt${course.id}' onclick='getCourse("tt${course.id}")' class="row">
                    <td class="d-inline-block col-2">${course.course}</td>
                    <td class="d-inline-block col-2">${course.date_start}</td>
                    <td class="d-inline-block col-2">${course.date_end}</td>
                    <td class="d-inline-block col-2">${course.day}</td>
                    <td class="d-inline-block col-2">${course.period}</td>   
                    <td class="d-inline-block col-2">${course.teacher}</td> 
                </tr>    
                `
                document.querySelector('#tt_table-id').appendChild(tt_tablebody);
                console.log(course);
            })
    })
}


function getCourse(courseIDsection){
    document.querySelector('#welcome').style.display = 'none';
    document.querySelector('#user-register').style.display = 'none';
    document.querySelector('#course-form').style.display = 'none';
    document.querySelector('#course-list').style.display = 'none';
    document.querySelector('#course-detail').style.display='block';

    fetch(`courses/${courseIDsection}`)
    .then(res => res.json())
    .then(course => {
        console.log(course);
        let courseinfo = document.createElement('div');
        courseinfo.innerHTML =
        `
        <h2> ${course.name}</h2>  
        <div style='width: 70%; float: left'>            
            <p>Teacher: ${course.teacher}</p>            
            <p>${course.name} (${course.courseID})</p>
            <p>Technical Information</p>
            <textarea style='width: 90%' name="" id="" rows="10">${course.description}</textarea>
        </div>
            
        <div style='width: 30%; float: right'>
            <h3>Course at glance</h3>
            <p>Term</p>
            <p>Credits</p>
            <p>Hours per week</p>
            <p>Limit of enrolement</p>
            <h3>Shedule</h3>
            <p>Hours per week</p>               
            <p>${course.day}</p>
            <p>${course.period}</p>

        </div>
        `
        document.querySelector('#course-detail').appendChild(courseinfo);
        
    })
}


function editCourse(courseID){
    document.querySelector('#welcome').style.display = 'none';
    document.querySelector('#user-register').style.display = 'none';
    document.querySelector('#course-form').style.display = 'none';
    document.querySelector('#course-list').style.display = 'none';
    document.querySelector('#course-detail').style.display='block';

    
    fetch(`updatePost/posts/${post_id}`)
    .then(res => res.json())
    .then(post => {
        console.log(post);
            output = `
            <div>
                <h4>Edit Content</h4>  
                <textarea id='editContent' rows="5" class="form-control" name="content" >${post.content}</textarea>
                <input id="editPost" type="submit" onclick='updateContent(${post.id})' value='Save' class="btn btn-primary"/>
            </div>
            `
            // console.log(output);
            element = document.createElement('div');
            element.innerHTML = output;
            document.querySelector('#edit-view').appendChild(element);       
    })
}





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

