import express from 'express';
import bodyparser from 'body-parser';
import { supabase } from "./config/supabase";

const app = express();
app.use(bodyparser.json());

async function createGigiluca(){
    const user = await supabase.auth.signUp({
        "email" : "gigilucagglc@gmal.com",
        "password" : "123456789"
    });

    console.log(user.data.user);
}

createGigiluca();
export default app;

