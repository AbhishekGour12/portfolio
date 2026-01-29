import { uploadBytes,  getDownloadURL, listAll } from 'firebase/storage';
//import { storage } from './Firebase';
import { useState } from 'react';
import {app, storage} from './Firebase';
import { useEffect } from 'react';
import {get, push, set, getDatabase, ref} from 'firebase/database';


function Admin(){
    const [url, setURL] = useState('');

    let data = async(e)=>{
    /** 
        const file = e.target.files[0];
      //  let db = getDatabase(app);
      //  const newref = push(ref(db, 'profile/'));
    
        const imageref = ref(storage, `projects/foody/${file.name}`);
      
        
      /**   set(newref, {
            name: 'snkd',
            img: file
        }).then(()=>{
            alert('successfully updated');
        })
        const dataref = ref(db, 'profile/');
        const snapshot = await get(dataref);
       
            console.log(Object.values(snapshot.val()));
        */
       /** 
      await getDownloadURL(imageref).then((url1)=>{
        console.log(url1)
        setURL(url1)
       }).catch((err)=>{
        switch (err.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
      
            // ...
      
            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
          }
       })
      */

    }
    
    let btn = async()=>{
        let db = getDatabase(app);
        const newref = push(ref(db, 'projects/'));
        set(newref, {
            name: 'WillSkill',
            description: "Our MERN-based e-learning platform offers high-quality courses at minimum rates, ensuring affordability with top features. It includes Razorpay payment integration for secure transactions, an AI-powered chatbot for instant support, and a Q&A system for student queries. Enjoy smooth video lectures, a resume builder, and interactive quizzes. The admin panel allows seamless course and user management, while advanced search & filtering enhances navigation. Built for an engaging, efficient, and cost-effective learning experience.",
            img: ['https://firebasestorage.googleapis.com/v0/b/portolioproject-85b16.appspot.com/o/projects%2FWillSkill%2FScreenshot%202025-04-04%20143238.png?alt=media&token=09849c1e-6fa4-497d-9afe-cb32ec95451a']
        }).then(()=>{
            alert('successfully updated');
        })
        const dataref = ref(db, 'projects/');
        const snapshot = await get(dataref);
        setURL(Object.values(snapshot.val()));
       
            console.log(Object.values(snapshot.val()));
      

    }
      
            
     const data1 = async()=>{
      const listall = ref(storage, 'projects/WillSkill');
      
        const img = await listAll(listall);
        const urls = await Promise.all(
            img.items.map((item) => getDownloadURL(item))
          );
          console.log(urls);
         

     }
    
    
      data1()
    
      
    
    
   
    return(
        <>
         <div className = "border">
            <form   encType="multipart/form-data">
                <input type = "file" onChange={data}/>
            </form>
        
        </div>
       <button onClick={btn}>
       btn

       </button>
       <div>
        {url?url.map((item)=>(
          <div>{item}</div>

        )): ''}
       </div>
       
       
    
     


        </>
    )
}
export default Admin;