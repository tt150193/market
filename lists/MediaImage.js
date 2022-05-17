const {
    File,
    Text,
    Slug,
    Relationship,
    Select,
    Password,
    Checkbox,
    CalendarDay,
    DateTime,
} = require('@keystonejs/fields');
var cloudinary = require('cloudinary');
const { Content } = require('@keystonejs/fields-content');
const { CloudinaryAdapter } = require('@keystonejs/file-adapters');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');
const cloudinaryAdapter = new CloudinaryAdapter({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: process.env.CLOUDINARY_FOLDER_MEDIA,
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});
module.exports = {
    fields: {
        title: {
            type: Text
        },
        image: { 
            type: CloudinaryImage, adapter: cloudinaryAdapter 
        },
        note: {
            type: Text
        },
        products: {
            type: Relationship,
            ref: "Product.images",
            many: true
        }
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
            if(existingItem.image){
                cloudinary.v2.uploader.destroy(existingItem.image._meta.public_id, function(e, r){
                    if(e){
                        throw e;
                    } else {
                        console.log("Delete file: OK");
                    }
                });
            }
        },
    },
    access: {

    }
}