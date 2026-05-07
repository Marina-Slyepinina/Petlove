import { useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import swal from 'sweetalert';
import { CLOUDINARY } from '../../constants';
import { api } from '../../lib/api';
import { capitalizeFirstLetter } from '../../lib/utils';
import { addPetSchema, type AddPetFormValues } from '../../schemas/petSchema';
import css from './AddPetForm.module.css'
import { useAuthStore } from '../../store/authStore';

export const AddPetForm = () => {

    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const species = useLoaderData() as string[];
    const setUser = useAuthStore(state => state.setUser);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AddPetFormValues>({
        resolver: yupResolver(addPetSchema),
        mode: 'onChange',
        defaultValues: {
            sex: 'female',
            imgURL: '',
            title: '',
            name: '',
            birthday: '',
            species: '',
        }
    });

    const currentImgURL = watch('imgURL');
    const currentSex = watch('sex');

    const onSubmit = async (data: AddPetFormValues) => {
        try {
            const res = await api.post('/users/current/pets/add', data);
            setUser(res.data);
            console.log(res.data);

            swal('Woohoo!', 'Your pet has been successfully added', 'success')
            navigate('/profile');
        } catch (error) {
            console.error('Error adding pet:', error);
            swal('Oops', 'Something went wrong!', 'error')
        }
    };

    const handleUploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            swal('Oops', 'Please select an image', 'warning');
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY.UPLOAD_PRESET);

        setIsUploadingPhoto(true);

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/image/upload`,
                formData
            );

            setValue('imgURL', res.data.secure_url, { shouldValidate: true });
        } catch (error) {
            console.error('Photo upload error:', error);
            swal('Oops', 'Error loading photo', 'error')
        } finally {
            setIsUploadingPhoto(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className={css.container}>

            <form onSubmit={handleSubmit(onSubmit)} className={css.form}>

                <div className={css.radioGroup}>
                    <label className={css.radioLabel}>
                        <input type="radio" value="female" {...register('sex')} className={css.radioInput} />
                        <svg className={clsx(css.svgRadio, css.female, currentSex === 'female' && css.active)}>
                            <use href='sprite.svg#female'></use>
                        </svg>
                    </label>

                    <label className={css.radioLabel}>
                        <input type="radio" value="male" {...register('sex')} className={css.radioInput} />
                        <svg className={clsx(css.svgRadio, css.male, currentSex === 'male' && css.active)}>
                            <use href='sprite.svg#male'></use>
                        </svg>
                    </label>

                    <label className={css.radioLabel}>
                        <input type="radio" value="multiple" {...register('sex')} className={css.radioInput} />
                        <svg className={clsx(css.svgRadio, css.multiple, currentSex === 'multiple' && css.active)}>
                            <use href='sprite.svg#male-female'></use>
                        </svg>
                    </label>
                </div>
                {errors.sex && <span className={css.errorMessage}>{errors.sex.message}</span>}

                <div className={css.avatarPreview}>
                    {currentImgURL ? (
                        <img src={currentImgURL} alt="Pet" className={css.avatarImage} />
                    ) : (
                        <div>
                            <svg className={css.avatarPlaceholder}>
                                <use href='sprite.svg#pet-footprint'></use>
                            </svg>
                        </div>
                    )}
                </div>

                <div className={css.inputGroupWrapper}>
                    <div className={clsx(css.inputGroupRow, css.inputWrapper)}>
                        <div className={clsx(css.inputWrapper, css.stretchWidth)}>
                            <input
                                {...register('imgURL')}
                                className={clsx(css.input, errors.imgURL && css.error)}
                                placeholder="Enter URL"
                            />
                        </div>
                        <button
                            type="button"
                            className={css.uploadBtn}
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploadingPhoto}
                        >
                            {isUploadingPhoto ? 'Uploading...' : 'Upload photo'}
                            <svg className={css.uploadSvg}>
                                <use href='sprite.svg#upload-cloud'></use>
                            </svg>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleUploadPhoto}
                            className={css.uploadBaseInput}
                            accept="image/*"
                        />
                        {errors.imgURL && <span className={css.errorMessage}>{errors.imgURL.message}</span>}
                    </div>

                    <div className={css.inputWrapper}>
                        <input
                            {...register('title')}
                            className={clsx(css.input, errors.title && css.error)}
                            placeholder="Title"
                        />
                        {errors.title && <span className={css.errorMessage}>{errors.title.message}</span>}
                    </div>

                    <div className={css.inputWrapper}>
                        <input
                            {...register('name')}
                            className={clsx(css.input, errors.name && css.error)}
                            placeholder="Pet's Name"
                        />
                        {errors.name && <span className={css.errorMessage}>{errors.name.message}</span>}
                    </div>

                    <div className={css.inputGroupRow}>
                        <div className={clsx(css.inputWrapper, css.stretchWidth)}>
                            <input
                                type="date"
                                {...register('birthday')}
                                className={clsx(css.input, errors.birthday && css.error)}
                            />
                            {errors.birthday && <span className={css.errorMessage}>{errors.birthday.message}</span>}
                        </div>
                        <div className={clsx(css.inputWrapper, css.stretchWidth)}>
                            <select
                                {...register('species')}
                                className={clsx(css.input, errors.species && css.error)}
                            >
                                <option value="" disabled>Type of pet</option>
                                {species.map(spec => (
                                    <option value={spec} key={spec}>{capitalizeFirstLetter(spec)}</option>
                                ))}
                            </select>
                            {errors.species && <span className={css.errorMessage}>{errors.species.message}</span>}
                        </div>
                    </div>
                </div>

                <div className={css.actions}>
                    <button
                        type="button"
                        className={clsx(css.btn, css.backBtn)}
                        onClick={() => navigate('/profile')}
                    >
                        Back
                    </button>
                    <button type="submit" className={clsx(css.btn, css.submitBtn)}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
