import loginModel from "../models/userSchema.js";
import jwt from 'jsonwebtoken';

const registeractionpage = async function (req, res) {
    console.log(req.body);
  
    var { name, email, password } = req.body;
  
  
    const user = await loginModel.findOne({ email })
    console.log(user);
  
    if (user) {
  
      res.status(403).json({ message: "you have already an account", success: false });
  
    } else {
  
      var dataToInsert = {
        name: name,
        email: email,
        password: password
      }
      var instance = new loginModel(dataToInsert);
      var resultAfterInsert = await instance.save();
  
      res.status(200).json({ message: "registration successfully", success: true });
  
  
    }
  
  }

  const loginactionpage = async function (req, res) {
    console.log(req.body);
    var { email, password } = req.body;
  
  
  
    const user = await loginModel.findOne({ email })
  
    if (!user) {
      res.status(403).json({ message: "no record fund", success: false })
    }
  
  
    if (user.password === password) {
  
  
      const jwtToken = jwt.sign({ email: user.email, name: user.name, _id: user._id }, process.env.JWT_SECRET)
  
      res.status(200).json({ message: "record fund", jwtToken , email, name: user.name, success: true })
  
  
    } else {
      res.status(403).json({ message: "password is incorrect", success: false })
    }
  
  
  
  
  }

  const addexpensepage = async function (req, res) {

    const body = req.body;
    const{_id} = req.user;
    
    console.log(body,_id);
      
    try{

      const userData = await loginModel.findByIdAndUpdate(
        _id,
        {
          $push : {expenses: body}
        },
        {new: true}
      )

      res.status(200).json({ message: "expense added successfully", data: userData?.expenses , success: true })


    }catch(err){
      res.status(500).json({
        message: 'Internal server error',
        success: false,
        error: err,
      });
    }

  }


  const fetchexpensepage = async function (req, res) {

    const body = req.body;
    const{_id} = req.user;
    
    console.log(body,_id);
      
    try{

      const userData = await loginModel.findById(_id).select('expenses')

      res.status(200).json({ message: "fetch expense successfully", data: userData?.expenses , success: true })


    }catch(err){
      res.status(500).json({
        message: 'Internal server error',
        success: false,
        error: err,
      });
    }
    

 }

 const deleteexpensepage = async function (req, res) {

  const{_id} = req.user;
  const{expenseId} = req.params;
    
  try{

    const userData = await loginModel.findByIdAndUpdate(
      _id,
      {
        $pull : {expenses: {_id : expenseId}}
      },
      {new: true}
    )

    res.status(200).json({ message: "expense delete successfully", data: userData?.expenses , success: true })


  }catch(err){
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: err,
    });
  }
  

}



  export {
    registeractionpage,
    loginactionpage,
    addexpensepage,
    fetchexpensepage,
    deleteexpensepage
  }