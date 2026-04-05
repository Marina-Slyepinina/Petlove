import { useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useAuthStore } from '../../store/authStore';
import { CLOUDINARY } from '../../constants';
import type { UserEditData } from '../../types/user';
import { validationSchema, type UserEditValidationSchema } from '../../schemas/userEditSchemas';
import { Modal } from '../Modal/Modal';
import css from './ModalEditUser.module.css';

interface ModalEditUserProps {
    onClose: () => void;
    userData: UserEditData | null
}


export const ModalEditUser = ({ onClose, userData }: ModalEditUserProps) => {

    const updateUser = useAuthStore((state) => state.updateUser);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserEditValidationSchema>({
        defaultValues: {
            name: userData?.name || '',
            email: userData?.email || '',
            phone: userData?.phone || '',
            avatar: userData?.avatar || '',
        },
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

    const avatarUrl = watch('avatar');
    const displayAvatar = avatarUrl || userData?.avatar;

    const onSubmitForm = async (data: UserEditValidationSchema) => {
        const payload: UserEditData = {
            name: data.name,
            email: data.email,
        }

        if (data.phone && data.phone.trim() !== '') {
            payload.phone = data.phone
        }

        if (data.avatar && data.avatar.trim() !== '') {
            payload.avatar = data.avatar
        }

        try {
            await updateUser(payload);
            onClose();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleUploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image.');
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY.UPLOAD_PRESET);

        setIsUploadingPhoto(true);

        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/image/upload`, formData);

            const uploadedUrl = res.data.secure_url;

            setValue('avatar', uploadedUrl, { shouldValidate: true });
        } catch (error) {
            console.error('Photo upload error:', error);
            alert('Photo upload error. Please try again.');
        } finally {
            setIsUploadingPhoto(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Modal onClose={onClose}>
            <div className={css.modalWrapper}>

                <h2 className={css.title}>Edit information</h2>

                <div className={css.userAvatarWrapper}>
                    {displayAvatar ? (
                        <img src={displayAvatar} alt="User's photo" className={css.avatarImage} />
                    ) : (
                        <svg width={40} height={40}>
                            <use href="sprite.svg#user"></use>
                        </svg>
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className={css.form}>
                    <div className={css.formInputs}>
                        <div className={css.inputGroup}>
                            <div className={css.avatarUrlInputWrapper}>
                                <input
                                    {...register('avatar')}
                                    className={css.input}
                                    placeholder="https://..."
                                    disabled
                                />
                                <button
                                    type="button"
                                    className={css.uploadBtn}
                                    onClick={handleUploadClick}
                                    disabled={isUploadingPhoto}
                                >
                                    {isUploadingPhoto ? 'Uploading...' : (
                                        <>
                                            Upload photo
                                            <svg width={18} height={18} className={css.uploadIcon}>
                                                <use href="sprite.svg#upload-cloud"></use>
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleUploadPhoto}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                        </div>

                        <div className={css.inputWrapper}>
                            <input
                                {...register('name')}
                                className={clsx(css.input, errors.name && css.error)}
                                placeholder="Anna"
                            />
                            {errors.name && <span className={css.errorMessage}>{errors.name.message}</span>}
                        </div>
                        <div className={css.inputWrapper}>
                            <input
                                {...register('email')}
                                className={clsx(css.input, errors.email && css.error)}
                                placeholder="anna00@gmail.coml"
                            />
                            {errors.email && <span className={css.errorMessage}>{errors.email.message}</span>}
                        </div>
                        <div className={css.inputWrapper}>
                            <input
                                {...register('phone')}
                                className={clsx(css.input, errors.phone && css.error)}
                                placeholder="+380 65 669 12 24"
                            />
                            {errors.phone && <span className={css.errorMessage}>{errors.phone.message}</span>}
                        </div>
                    </div>

                    <button type="submit" className={css.saveBtn}>
                        Save
                    </button>
                </form>
            </div>
        </Modal>
    )
}
