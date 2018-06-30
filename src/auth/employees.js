'use strict';
import mongoose,{Schema} from 'mongoose';
const employeeSchema = mongoose.Schema({
  userID: {type:Schema.Types.ObjectId, ref:'users'},
  name: {type: String, required: true},
});
const Employee = mongoose.model('employees', employeeSchema);
export default Employee;