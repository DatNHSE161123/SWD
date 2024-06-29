"use client"

import { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiFillCamera } from 'react-icons/ai';
import Image from 'next/image';
import Button from '../../providers/form/Button';
import { settingProfileInputs } from '@/utils/constants';
import Input from '../../providers/form/Input';
import { toast } from 'react-toastify';
import { GlobalContext } from '@/contexts';
import { useForm } from 'react-hook-form';
import { UserProfileSettingForm } from '@/types';
import { settingProfileSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileService } from '@/services/user';
import { Loading, LoadingFullScreen } from '../../providers/loader';
import { isValidUrl, validateURLAvatar } from '@/utils/validData';

const SettingProfile = () => {
    const maxSize = 1048576

    const {
        user,
        isLoading,
        setIsLoading,
        isLoadingPage,
        setIsLoadingPage,
        setFetchUser
    } = useContext(GlobalContext) || {}

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        watch
    } = useForm<UserProfileSettingForm>({
        resolver: yupResolver(settingProfileSchema),
        defaultValues: {
            username: "",
            phone: "",
            address: "",
            avatar: ""
        }
    })

    const avatar = watch('avatar')

    useEffect(() => {
        if (setIsLoadingPage) setIsLoadingPage(true)

        if (user && user._id) {
            if (user.username) setValue('username', user.username)
            if (user.phone) setValue('phone', user.phone)
            if (user.address) setValue('address', user.address)
            if (user.avatar) setValue('avatar', user.avatar)
        }

        if (setIsLoadingPage) setIsLoadingPage(false)

    }, [user, setIsLoadingPage, setValue])

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            if (file.size <= maxSize) {
                const fileReader = new FileReader()
                fileReader.onload = (event) => {
                    const base64Image = event.target?.result;
                    //console.log(base64Image)
                    if (typeof base64Image === 'string') {
                        setUploadedImage(base64Image)
                        setValue('avatar', base64Image)
                    }
                };
                fileReader.readAsDataURL(file);
            } else {
                setError("avatar", { message: "Chỉ được upload ảnh dưới một 1MB" })
            }
        });
    }, [setValue, setError])

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop,
    });

    const onSubmit = async (data: UserProfileSettingForm) => {
        if (setIsLoading) setIsLoading(true)

        if (user) {
            const res = await updateProfileService({
                userId: user._id,
                username: data.username,
                phone: data.phone,
                address: data.address,
                avatar: data.avatar
            })

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

            if (setFetchUser) setFetchUser(true)
        }
        if (setIsLoading) setIsLoading(false)
    }


    return (
        <form className="relative p-8 flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
            {isLoadingPage ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingFullScreen loading={isLoadingPage} />
                </div>
            ) : (
                <>
                    <div className="text-gray-600 text-2xl md:text-3xl font-semibold">Hồ sơ</div>
                    <div className="border border-b border-black border-opacity-10" />
                    <div className="flex flex-row gap-10">
                        <div className="relative flex flex-col w-2/5 gap-3 items-center">
                            <div {...getRootProps()} className="relative flex-shrink-0 w-full pb-[100%] border-2 border-gray-400 rounded-full cursor-pointer">
                                <input {...getInputProps()} {...register('avatar')} />
                                {uploadedImage ? (
                                    <Image
                                        src={uploadedImage}
                                        alt="Uploaded avatar"
                                        className="object-cover rounded-full"
                                        fill
                                    />
                                ) : isValidUrl(avatar) ? (
                                    <Image
                                        src={validateURLAvatar(avatar)}
                                        alt="avatar"
                                        className="object-cover rounded-full"
                                        fill
                                    />

                                ) : (
                                    <input {...getInputProps()} />
                                )}
                            </div>
                            <div className="flex flex-row text-primary-blue-cus items-center gap-2 whitespace-nowrap">
                                <AiFillCamera size={30} />
                                <span className="text-lg md:text-xl font-semibold">Đăng tải hình ảnh</span>
                            </div>
                            {errors.avatar && <p className="text-red-500 font-medium h-4">{errors.avatar.message}</p>}
                        </div>
                        <div className="border border-black border-opacity-10" />
                        <div className="flex flex-col gap-10 w-full">
                            {settingProfileInputs.map((input) => (
                                <div className="grid grid-cols-7 items-center" key={input.id}>
                                    <div className="col-span-2">
                                        <label className="text-gray-600 font-semibold text-lg md:text-xl">
                                            {input.label}
                                        </label>
                                    </div>
                                    <div className="col-span-5">
                                        <Input
                                            colorInput="bg-[#F5F5F5] border-none md:text-base text-sm"
                                            name={input.name}
                                            type={input.type}
                                            id={input.id}
                                            maxLength={input.maxLength}
                                            register={register}
                                            errors={errors}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative flex justify-center">
                        {isLoading ? (
                            <Button
                                title={<Loading loading={isLoading} color="white"/>}
                                type="submit"
                                style="py-3 text-xl px-12"
                                isHover={false}
                            />
                        ) : (
                            <Button
                                title="Lưu"
                                type="submit"
                                style="py-3 text-xl px-12"
                            />
                        )}
                    </div>
                </>
            )}
        </form >
    )
}

export default SettingProfile;
