"use client"

import { GlobalContext } from "@/contexts"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import Background from "../hero/Background"
import { toast } from "react-toastify"
import { registerInputs } from "@/utils/constants"
import Input from "../providers/form/Input"
import { RegisterFormData } from "@/types"
import { registerSchema } from "@/utils/schema"
import registerService from "@/services/register"
import { Loading } from "../providers/loader"

const RegisterForm = () => {
    const {
        isAuthUser,
        setIsLoading,
        isLoading,
    } = useContext(GlobalContext) || {}

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterFormData) => {
        if (setIsLoading) setIsLoading(true)

        if (data.password !== data.confirmPassword) {
            toast.error("Password don't match", {
                position: "top-right",
            })
            if (setIsLoading) setIsLoading(false)
            return
        }

        const res = await registerService(data)

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

        router.push("/login")

        if (setIsLoading) setIsLoading(false)
    }

    useEffect(() => {
        if (isAuthUser) {
            router.push("/")
        }
    }, [router, isAuthUser])

    return (
        <Background src="/images/login-banner_1.jpg">
            <div className="h-screen flex items-center">
                <div className="w-1/4 h-fit bg-white rounded-md translate-x-1/2">
                    <div className="flex flex-col gap-8 p-10">
                        <label className="text-2xl font-semibold">Đăng ký</label>
                        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                            {registerInputs.map((input) => (
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
                            {isLoading ? (
                                <button className="w-full text-center py-2 uppercase rounded-md text-lg text-white bg-primary-cus" type="submit">
                                    <Loading loading={isLoading} color="white" />
                                </button>
                            ) : (
                                <button className="w-full text-center py-2 uppercase rounded-md text-lg text-white bg-primary-cus hover:bg-red-400" type="submit">
                                    Đăng ký
                                </button>
                            )}
                        </form>
                        <div className="flex flex-row justify-between items-center">
                            <div className="h-[1px] w-1/3 bg-black bg-opacity-10" />
                            <div className="uppercase text-black text-opacity-50">Hoặc</div>
                            <div className="h-[1px] w-1/3 bg-black bg-opacity-10" />
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="flex flex-row gap-2">
                                <span className="text-black text-opacity-50">
                                    Bạn mới đã có tài khoản?
                                </span>
                                <button className="text-primary-cus cursor-pointer" onClick={() => router.push("/login")}>
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Background>
    )
}

export default RegisterForm