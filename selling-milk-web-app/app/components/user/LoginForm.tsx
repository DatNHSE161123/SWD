"use client"

import { useRouter } from "next/router"
import Background from "../hero/Background"
import Input from "../providers/form/Input"
import { loginInputs } from "@/utils/constants"
import React, { useContext, useEffect } from "react"
import { GlobalContext } from "@/contexts"
import { useForm } from "react-hook-form"
import { LoginFormData } from "@/types"
import { loginSchema } from "@/utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from 'react-toastify'
import { loginService } from "@/services/login"
import { Loading } from "../providers/loader"
import Cookies from 'js-cookie'

const LoginForm = () => {
    const {
        isAuthUser,
        setIsAuthUser,
        setUser,
        user,
        setIsLoading,
        isLoading,
        setIsRefresh
    } = useContext(GlobalContext) || {}

    const router = useRouter()

    const userT = "user"
    const adminT = "admin"

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        if (setIsLoading) setIsLoading(true)

        const res = await loginService(data)

        if (res.data == null) {
            toast.error(res.message, {
                position: "top-right",
            })
            if (setIsLoading) setIsLoading(false)
            return
        }

        toast.success(res.message, {
            position: "top-right",
        })

        if (setIsAuthUser && setUser) {
            setIsAuthUser(true)
            const user = res.data
            setUser(user)
        }

        Cookies.set("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data))
        localStorage.setItem("token", res.data.token);

        if (setIsLoading) setIsLoading(false)
    }

    useEffect(() => {
        if (isAuthUser && user && user.role === userT) {
            router.push("/")
        } else if (isAuthUser && user && user.role === adminT) {
            router.push("/admin/user-management")
        }
    }, [router, isAuthUser, user])

    return (
        <Background src="/images/login-banner_1.jpg">
            <div className="h-screen flex items-center">
                <div className="w-1/4 h-fit bg-white rounded-md translate-x-1/2">
                    <div className="flex flex-col gap-8 p-10">
                        <label className="text-2xl font-semibold">Đăng nhập</label>
                        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                            {loginInputs.map((input) => (
                                <React.Fragment key={input.id}>
                                    <Input
                                        id={input.id}
                                        name={input.name}
                                        label={input.label}
                                        placeholder={input.placeholder}
                                        type={input.type}
                                        register={register}
                                        errors={errors}
                                        colorInput="border border-black border-opacity-10 focus:border-opacity-30 focus:border focus:border-black focus:outline-none"
                                    />
                                </React.Fragment>
                            ))}
                            <div className="flex flex-col gap-2">
                                {isLoading ? (
                                    <button className="w-full text-center py-2 uppercase rounded-md text-lg text-white bg-primary-cus" type="submit">
                                        <Loading loading={isLoading} color="white" />
                                    </button>
                                ) : (
                                    <button className="w-full text-center py-2 uppercase rounded-md text-lg text-white bg-primary-cus hover:bg-red-400" type="submit">
                                        Đăng nhập
                                    </button>
                                )}
                                <p className="text-blue-800 cursor-pointer text-sm">
                                    Quên mật khẩu?
                                </p>
                            </div>
                        </form>
                        <div className="flex flex-row justify-between items-center">
                            <div className="h-[1px] w-1/3 bg-black bg-opacity-10" />
                            <div className="uppercase text-black text-opacity-50">Hoặc</div>
                            <div className="h-[1px] w-1/3 bg-black bg-opacity-10" />
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="flex flex-row gap-2">
                                <span className="text-black text-opacity-50">
                                    Bạn mới biết đến chúng tôi?
                                </span>
                                <button className="text-primary-cus cursor-pointer" onClick={() => router.push("/register")}>
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Background>
    )
}

export default LoginForm