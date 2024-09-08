import store, { setAdminError, setAdminState,  setError, setUserDetails } from "../../store"


export const verifyUser = async () =>{
   const payload = localStorage.getItem('payload')
   const response = await fetch('http://localhost:5000/verify',{
      method: 'POST',
      headers: { 'Content-type' : 'application/json' },
      body: JSON.stringify({ payload: payload })
   })
   if(response.status === 200){
      const data = await response.json()
      store.dispatch(setUserDetails(data.user))
      return true
   }
   if(response.status === 202){
      store.dispatch(setError('Session Expired'))
   }
   if(response.status === 203){
      store.dispatch(setError('Internal server error'))
   }
   if(response.status == 204){
      store.dispatch(setError('No user found'))
   }
   if(response.status ===  205){
      store.dispatch(setError('Sorry user blocked'))
   }
   localStorage.removeItem('payload')
   return false
}



export const verifyAdmin = async () => {

   const payload = localStorage.getItem('Admin');
   console.log("payload" , payload);
   const response = await fetch('http://localhost:5000/admin/verify', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ payload: payload })
   })
   if (response.status === 200) {
       const data = await response.json()
       store.dispatch(setAdminState(data.admin))
       return true
   }
   if (response.status === 202) {
       store.dispatch(setAdminError('Session Expired'))
   }
   if (response.status === 403) {
       store.dispatch(setAdminError('Internal server error'))
   }
   if (response.status === 201) {
       store.dispatch(setAdminError('No admin found'))
   }
   localStorage.removeItem('Admin')
   return false
}
