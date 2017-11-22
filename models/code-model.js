const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const codeSchema = new Schema(
  {
    codeName: {
      type: String,
    }  ,
    codeAuthor: {
      type: String,
    },
    codeLanguage: {
      type: String,
    },
    codeDescription: {
      type: String,
    },
    codeLink: {
      type: String,
    },
    
    owner: {
      type: Schema.Types.ObjectId,
      requireed: true
    }
  }
);


const CodeModel = mongoose.model("Code", codeSchema);

module.exports = CodeModel;
