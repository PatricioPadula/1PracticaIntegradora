import { Router } from "express";

const router = Router();

router.get("/",(req,res)=>{
    res.render("home");
});

router.get("/realTimeProducts", (req,res)=>{
    res.render("realTimeProducts");
});

export {router as viewsRouter};
