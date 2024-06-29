import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const loginSchema = yup.object().shape({
    email: yup.string().
        required("Email không được để trống").
        email("Email không hợp lệ"),
    password: yup.string().
        required("Mật khẩu không được để trống").
        min(6, "Mật khẩu phải có ít nhất 6 ký tự").
        max(50, "Mật khẩu chỉ được nhiều nhất 50 ký tự"),
})

export const registerSchema = yup.object().shape({
    username: yup.string().
        required("Tên không được để trống ").
        min(4, "Tên tối thiểu 4 kí tự").
        max(50, "Tên nhiều nhất chỉ được 50 kí tự"),
    email: yup.string().
        required("Email không được để trống").
        email("Email không hợp lệ").
        max(50, "Mail nhiều nhất chỉ được 50 kí tự"),
    phone: yup.string().
        required("Số điện thoại không được để trống").
        matches(phoneRegExp, "Số điện thoại phải nhập số").
        min(7, "Số điện thoại có ít nhất 7 số").
        max(15, "Số điện thoại nhiều nhất 15 số"),
    password: yup.string().
        required("Mật khẩu không được để trống").
        min(6, "Mật khẩu phải có ít nhất 6 ký tự").
        max(50, "Mật khẩu nhiều nhất 50 ký tự"),
    confirmPassword: yup.string().
        required("Mật khẩu xác nhận không được để trống").
        oneOf([yup.ref("password"), ""], "Mật khẩu xác nhận phải khớp"),
    address: yup.string().
        required("Địa chỉ không được để trống").
        min(4, "Địa chỉ  tối thiểu 4 kí tự").
        max(100, "Địa chỉ nhiều nhất chỉ được 100 kí tự"),
})

export const postProductSchema = yup.object().shape({
    name: yup.string().
        required("Tên sản phẩm không được để trống ").
        min(4, "Tên tối thiểu 4 kí tự").
        max(100, "Tên nhiều nhất chỉ được 100 kí tự"),
    description: yup.string().
        required("Mô tả không được để trống ").
        min(10, "Mô tả tối thiểu 10 kí tự").
        max(1000, "Mô tả nhiều nhất chỉ được 1000 kí tự"),
    origin: yup.string().
        required("Xuất xứ không được để trống ").
        min(4, "Xuất xứ tối thiểu 4 kí tự").
        max(100, "Xuất xứ nhiều nhất chỉ được 100 kí tự"),
    savour: yup.string().
        required("Hương vị không được để trống ").
        min(4, "Hương vị tối thiểu 4 kí tự").
        max(100, "Hương vị nhiều nhất chỉ được 100 kí tự"),
    brand: yup.string().
        required("Thương hiệu không được để trống ").
        min(4, "Thương hiệu tối thiểu 4 kí tự").
        max(100, "Thương hiệu nhiều nhất chỉ được 100 kí tự"),
    from: yup.string().
        required("Gửi từ không được để trống ").
        min(4, "Gửi từ tối thiểu 4 kí tự").
        max(100, "Gửi từ nhiều nhất chỉ được 100 kí tự"),
    price: yup.number().
        required("Giá không được để trống").
        min(1000, "Tối thiểu 1.000 VNĐ").
        max(10000000, "Tối đa 1.000.000 VNĐ"),
})

export const walletRechargeSchema = yup.object().shape({
    amount: yup.number().
        required("Không được để trống").
        min(10000, "Tối thiểu là 10,000 VNĐ").
        max(100000000, "Tối đa là 100,000,000 VNĐ"),
})

export const walletSchema = yup.object().shape({
    bankNumber: yup.string().required("Không được để trống").min(10, "Tối thiểu 10 ký tự").max(20, "Nhiều nhất 20 ký tự"),
    accountName: yup.string().required("Không được để trống"),
    amount: yup.number().
        required("Không được để trống").
        min(10000, "Tối thiểu là 10,000 VNĐ").
        max(100000000, "Tối đa là 100,000,000 VNĐ"),
})

export const stockAddSchema = yup.object().shape({
    quantity: yup.number().required("Không được để trống").min(1, "Số lượng hàng tối thiểu là 1"),
    expiry: yup.number().required("Không được để trông").min(1, "Tối thiểu là 1 tháng"),
})

export const canceledTransactionSchema = yup.object().shape({
    reason: yup.string().
        required("Không được để trống").
        min(10, "Tối thiểu là 10 ký tự").
        max(1000, "Tối đa là 1000 ký tự"),
})

export const shippingTransactionSchema = yup.object().shape({
    shippingHour: yup.number().
        required("Không được để trống").
        min(1, "Tối thiểu là 1h").
        max(720, "Tối đa là 720h"),
})

export const discountSchema = yup.object().shape({
    amount: yup.number().
        required("Không được để trống").
        min(0, "Tối thiểu là 0%").
        max(99, "Tối đa là 99%"),
})

export const commentSchema = yup.object().shape({
    content: yup.string().
        required("Không được để trống").
        min(10, "Tối thiểu là 10 ký tự").
        max(1000, "Tối đa là 1000 ký tự"),
    packaging: yup.number().
        required("Không được để trống").
        min(1, "Tối thiếu là 1").
        max(10, "Tối đa là 10"),
    quality: yup.number().
        required("Không được để trống").
        min(1, "Tối thiếu là 1").
        max(10, "Tối đa là 10")
})

export const settingProfileSchema = yup.object().shape({
    username: yup.string().
        required("Biệt danh không được để trống").
        min(4, "Tối thiểu 4 kí tự").
        max(50, "Nhiều nhất 50 kí tự"),
    phone: yup.string().
        required("Số điện thoại không được để trống").
        matches(phoneRegExp, "Số điện thoại phải nhập số").
        min(7, "Số điện thoại có ít nhất 7 số").
        max(15, "Số điện thoại nhiều nhất 15 số"),
    address: yup.string().
        required("Địa chỉ không được để trống ").
        min(10, "Tối thiểu 10 kí tự").
        max(100, "Nhiều nhất 100 kí tự"),
    avatar: yup.lazy((value) =>
        /^data/.test(value)
            ? yup.string()
                .trim()
                .required("Hình ảnh không được để trống")
                .matches(
                    /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&",()*+;=\-._~:@/?%\s]*)$/i,
                    "Không phải là URL",
                )
            : yup.string().trim().
                required("Hình ảnh không được để trống").
                url("Không phải là URL"),
    ),
}).required()