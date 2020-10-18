const NewsSchema = require('../../models/newsSchema');


const newsService = {
    singleNews: async (req, res) => {
        const {slug} = req.params
        const news = await NewsSchema.findOne({
            slug:slug
        })
        return res.render('site/singleNews', {
            title: 'Elsafa Plast | News ',
            metDescription: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            ogTitle: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            dataProvided:news
        });

    },
    blogPage: async (req, res) => {
        const news = await NewsSchema.find({
            tag:"news"
        })
        return res.render('site/blog', {
            title: 'الأسئلة الشائعة',
            metDescription: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            ogTitle: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            dataProvided:news
        });

    },
    portPage: async (req, res) => {
        const news = await NewsSchema.find({
            tag:"portfolio"
        })
        return res.render('site/portfolio', {
            title: 'الأسئلة الشائعة',
            metDescription: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            ogTitle: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            dataProvided:news
        });

    },

}

module.exports = newsService