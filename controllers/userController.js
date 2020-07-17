const models = require('../models/index');

const bcryptjs = require('bcryptjs')

exports.index = async (req, res, next) =>{
  // const users = await models.User.findAll({
  //   attributes:['id','name','email','created_date'],
  //   order:[['id','desc']]
  // });

    // const users = await models.User.findAll({
    //   attributes: { exclude: ['password'] },
    //   order:[['id','desc']]
    // });

    // const users = await models.User.findAll({
    //   attributes: { exclude: ['password'] },
    //   where:{
    //     email:'tan@gmail.com'
    //   },
    //   order:[['id','desc']]
    // });

    // const users = await models.User.findAll({
    //   attributes:['id','name',['email','userName'],'created_date'],
    //   order:[['id','desc']]
    // });

    // const sql = "select id,name,email,created_date from users order by id desc";
    // const users = await models.sequelize.query(sql,{
    //   type: models.sequelize.QueryTypes.SELECT
    // });

    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: models.Blog,
          as: 'blogs',
          attributes:['id','title']
        }
      ],
      order:[['id','desc'],
      ['blogs','id','desc']
    ]
    });

    res.status(200).json({
      data : users
    });
}

exports.show = async (req, res, next) =>{
  try{
    const {id} = req.params 
    const user = await models.User.findByPk(id,{
      attributes: { exclude: ['password'] }
    })

    if (!user){
      const error = new Error('ไม่พบข้อมูล user : '+ id);
      error.statusCode = 404;
      throw(error)
    }
    res.status(200).json({
      data : user
    });
  }catch(error){
    res.status(error.statusCode).json({
      data : error.message
    });
  }
}


//insert user
exports.insert = async (req, res, next) =>{
  try{
    //const user = req.body // get by object 
    const {name,email,password} = req.body 
    const existEmail = await models.User.findOne({ where : {email:email}})
    if(existEmail){
      const error = new Error('มีผู้ใช้ email ในระบบแล้ว')
      error.statusCode=400
      throw(error)
    }
    //hash passsword
    const salt = await bcryptjs.genSalt(8)
    const passwordHash = await bcryptjs.hash(password,salt)
    const user = await models.User.create({
      name,
      email,
      password : passwordHash
    })
    res.status(201).json({
      data : 'เพิ่มข้อมูลเรียบร้อย'
    });
  }catch(error){
    res.status(error.statusCode).json({
      data : error.message
    });
  }
}

//update user
exports.update = async (req, res, next) =>{
  try{
    const {id, name,email,password} = req.body 

    if(req.params.id != id){
      const error = new Error('id ไม่ถูกต้อง')
      error.statusCode=400
      throw(error)
    }
    //hash passsword
    const salt = await bcryptjs.genSalt(8)
    const passwordHash = await bcryptjs.hash(password,salt)
    const user = await models.User.update({
      name,
      email,
      password : passwordHash
    },{
      where : {id : id}
    })
    res.status(200).json({
      message : 'แก้ไขข้อมูลเรียบร้อย'
    });
  }catch(error){
    res.status(error.statusCode).json({
      data : error.message
    });
  }
}

//delete user
exports.destroy = async (req, res, next) =>{
  try{
    const {id} = req.params 
    const user = await models.User.findByPk(id)
    if (!user){
      const error = new Error('ไม่พบข้อมูล user : '+ id);
      error.statusCode = 404;
      throw(error)
    }
    await models.User.destroy({
      where : {
        id:id
      }
    })
    res.status(200).json({
      message : 'ลบข้อมูลเรียบร้อย'
    });
  }catch(error){
    res.status(error.statusCode).json({
      data : error.message
    });
  }
}