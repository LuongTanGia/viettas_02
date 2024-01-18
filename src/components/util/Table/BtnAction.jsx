/* eslint-disable react/prop-types */
import { toast } from 'react-toastify'
import { MdDelete, MdEdit } from 'react-icons/md'
import { GiReceiveMoney } from 'react-icons/gi'

// eslint-disable-next-line react/prop-types
function BtnAction({ handleEdit, handleDelete, record, handleChangePhieuThu, typeTable }) {
  return (
    <div>
      <>
        {typeTable === 'detail' ? (
          <div className=" flex gap-1 items-center justify-center ">
            <div
              onClick={() => handleDelete(record)}
              title="Xóa"
              className="p-[3px]  border  border-red-500 rounded-md text-slate-50 bg-red-500  hover:bg-white hover:text-red-500  cursor-pointer "
            >
              <MdDelete size={16} />
            </div>
          </div>
        ) : (
          <div className=" flex gap-1 items-center justify-center ">
            <div
              // disabled="true"
              onClick={() => (record.PhieuThu ? null : handleChangePhieuThu(record))}
              title="Lập phiếu chi"
              className={`p-[3px] border rounded-md text-slate-50 ${
                record.PhieuThu ? 'bg-gray-400 cursor-not-allowed' : 'border-blue-500 bg-blue-500 hover:bg-white hover:text-blue-500 cursor-pointer'
              }`}
              disabled={record.PhieuThu ? true : false}
            >
              <GiReceiveMoney size={16} />
            </div>
            <div
              onClick={() => (record.PhieuThu ? toast.info('Dữ liệu đã được lập phiếu thu tiền!. Không thể sủa.') : handleEdit(record))}
              title="Sửa"
              className="p-[3px] border rounded-md text-slate-50 border-yellow-500 bg-yellow-400 hover:bg-white hover:text-yellow-500 cursor-pointer"
            >
              <MdEdit size={16} />
            </div>

            <div
              onClick={() => handleDelete(record)}
              title="Xóa"
              className="p-[3px]  border  border-red-500 rounded-md text-slate-50 bg-red-500  hover:bg-white hover:text-red-500  cursor-pointer "
            >
              <MdDelete size={16} />
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default BtnAction
