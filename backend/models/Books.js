import mongose from "mongoose";

const Books = mongose.Schema({
    title: { 
        type: String, 
        required: '{PATH} is required!'
    },
    subtitle: {
        type: String
    },
    author: { 
      type: mongose.Schema.Types.ObjectId, 
      ref: 'Users' // dia nyimpen nya id si user dari model
    }
  }, {
    timestamps: true
});

export default mongose.model('Books', Books);