import { supabase } from "../../../config/supabase";
import { Request, Response } from 'express';

export async function Login(req: Request, res: Response){
    try{
        const inEmail : string = req.body.email as string;
        const inPassword : string = req.body.password as string;
        
        if (!inEmail || !inPassword) {
            return res.status(400).json({ message: "Email e password sono obbligatorie" });
        }

        const login = await supabase.auth.signInWithPassword({
            "email" : inEmail,
            "password" : inPassword    });    
            
            if (login.error) {
                return res.status(401).json({
                    success: false,
                    message: "Credenziali non valide",
                    details: login.error.message
                });
            }

            if(!(login.data.user?.aud === "authenticated"))
                return res.status(400).send("Login fallito");

            return res.status(200).send("Login riuscito");
             
    }catch(err){
        console.error("Errore nel login:", err);
        return res.status(500).json({ message: "Errore interno del server" });
    }
   
}