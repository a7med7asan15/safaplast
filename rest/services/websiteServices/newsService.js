const NewsSchema = require('../../models/newsSchema');
const SettingSchema = require('../../models/settingSchema');


const newsService = {
    singleNews: async (req, res) => {
        const {slug} = req.params
        const setting = (await SettingSchema.find().limit(1))[0]
        const news = await NewsSchema.findOne({
            slug:slug
        })
        return res.render('site/singleNews', {
            title: `${news.title} - Elsafa Plast`,
            metDescription: news.title,
            ogTitle: news.title,
            dataProvided:news, 
            setting
        });

    },
    blogPage: async (req, res) => {
        const setting = (await SettingSchema.find().limit(1))[0]
        const news = await NewsSchema.find({
            tag:"news"
        })
        return res.render('site/blog', {
            title: "News - Elsafa Plast",
            metDescription: 'Elsafa Plast for electric Industries',
            ogTitle: 'Elsafa Plast for electric Industries',
            dataProvided:news, 
            setting
        });

    },
    portPage: async (req, res) => {
        const setting = (await SettingSchema.find().limit(1))[0]
        const news = await NewsSchema.find({
            tag:"portfolio"
        })
        return res.render('site/portfolio', {
            title: "Portfolio - Elsafa Plast",
            metDescription: 'Elsafa Plast for electric Industries',
            ogTitle: 'Elsafa Plast for electric Industries',
            dataProvided:news, 
            setting
        });

    },

}

module.exports = newsService