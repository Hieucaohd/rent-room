import mongoose from 'mongoose';
import Home from '../../src/models/Home';
import User from '../../src/models/User';
import Room from '../../src/models/Room';

let imagesAddress = [
    'https://news.mogi.vn/wp-content/uploads/2018/07/large-7D5-81F691.png',
    'https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/11/16/cho-thue-phong-tro-1613975723_1637034014.jpg',
    'https://blogcdn.muaban.net/wp-content/uploads/2018/07/5-luu-y-khi-tim-phong-tro-Ha-Noi.jpg',
    'https://timtro.vn/images/2021/08/tim-tro.jpg',
    'https://blog.rever.vn/hubfs/cho_thue_phong_tro_moi_xay_gia_re_ngay_phuong_15_tan_binh3.jpg',
    'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/5/19/806434/Nhatro.6.jpg',
    'https://kenh14cdn.com/2020/8/14/2-1597369763683536549678.jpg',
    'https://noithatnhadepviet.vn/upload/news/1-thiet-ke-nha-tro-7286.jpg',
    'https://toancanhbatdongsan.com.vn/uploads/images/2021/10/14/phong-tro-1-nguoi-thue-min-1634182443.jpg',
    'https://news.mogi.vn/wp-content/uploads/2018/07/large-7D5-81F691.png',
    'https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/06/12/phong-tro-gia-re-tphcm_1623484658.jpg',
    'https://news.mogi.vn/wp-content/uploads/2020/07/phongtrochothue0001.jpg',
    'https://noithatnhadepviet.vn/upload/elfinder/h%C3%ACnh%20thi%E1%BA%BFt%20k%E1%BA%BF/hinh%20support%205/2-thiet-ke-nha-tro-12m2.jpg',
    'https://xaynhatro.net/wp-content/uploads/2018/05/kinh-nghiem-xay-phong-tro-dep.png',
    'https://file4.batdongsan.com.vn/crop/640x430/2021/05/24/2bNpQlC2/20210524152600-0e90_wm.jpg',
    'https://file4.batdongsan.com.vn/crop/640x430/2022/05/27/20220527121640-fcb9_wm.jpg',
    'https://phongtrodn.com/wp-content/uploads/2019/01/51378967_289804915038966_7155023921492787200_n.jpg',
    'https://thichonha.com/wp-content/uploads/2021/09/y-tuong-decor-phong-tro.jpg',
    'https://www.studytienganh.vn/upload/2021/06/106951.jpg',
    'https://news.mogi.vn/wp-content/uploads/2020/03/tim-phong-tro.jpg',
    'https://propzy.vn/tin-tuc/wp-content/uploads/2021/02/kinh-nghiem-kinh-doanh-co-nen-xay-phong-tro-cho-thue.jpg',
    'https://www.hancorp.com.vn/wp-content/uploads/2020/08/phong-tro-2.jpg',
    'https://image-us.eva.vn/upload/3-2019/images/2019-07-14/thay-phong-tro-co-nhung-diem-nay-chuyen-nha-ngay-keo-ruoc-hoa-1-1563077307-773-width600height449.jpg',
    'https://dichvuchuyendo.net/wp-content/uploads/2020/10/phong-tro.jpg',
    'https://vcdn-giadinh.vnecdn.net/2020/08/18/received-697751297751351-jpeg-7926-4958-1597718429.jpg',
    'https://dichvuluatsuhanoi.com/wp-content/uploads/2019/12/cach-nhan-dien-phong-tro-tot.jpg',
    'https://xaynhachothue.vn/wp-content/uploads/2019/10/cho-thue-day-nha-tro-1.jpg',
    'https://alonhatro.com/assets/upload/estate/1/cho_thue_phong_tro_quan_tan_phu_co_gac_lung_vi_tri_nha_mat_tien1.jpg',
    'https://vnn-imgs-f.vgcloud.vn/2020/10/20/11/nha-tro-4.jpg',
    'https://nhandan.vn/imgold/media/k2/items/src/4122/2c9d33b69dcc9af027a53da083a56f55.jpg',
    'https://bacgiang.gov.vn/documents/20181/11616374/1630919027767_nha+tro.jpg/54b105f8-2b2b-4536-8075-66328ce43ace?t=1630919027770',
    'https://batdongsanexpress.vn/dataweb/2021/08/images/chi-phi-xay-phong-tro-12m2.jpg',
    'https://vanphongchothue.vn/uploads/noidung/images/ph%C3%B2ng%20tr%E1%BB%8D%20%C4%91%E1%BA%B9p.jpg',
    'https://xaydung3dvietnam.com/wp-content/uploads/2019/10/gia-xay-phong-tro-khep-kin-1.jpg',
    'https://cdn1.diachu.vn/files/resize/1366x768/2021/02/17/zUF/cho-thue-nha-tro-phong-tro-tai-phuong-tan-binh-thanh-pho-di-an-tinh-binh-duong.0.jpg',
    'https://suanhanhanh24h.vn/wp-content/uploads/2020/08/117256642_338272840676227_8459759966376026906_o.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV9qRue1r9448U5UsCwcPSR6lFKUmcO0n9Dw&usqp=CAU',
    'https://static.chotot.com/storage/chotot-kinhnghiem/nha/2022/01/936e7da6-thue-phong-tro-tphcm-4.webp',
    'https://bandon.vn/uploads/tim-phong-tro-1-nguoi-o-1.jpg',
    'https://cdn.diemnhangroup.com/noithatdiemnhan/2021/07/thiet-ke-phong-tro-12m2-co-gac-lung-can-dam-bao-nhung-dieu-gi-1.jpg',
    'http://img.timphongtro.vn/Images/item/5dad687016dd0.jpg',
    'https://afamilycdn.com/150157425591193600/2020/9/6/20200517162850-de09-1599386457573404221201.jpg',
    'https://bandon.vn/resize/1000x700/a-c/zc-1/f/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg',
];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/**
 * @param {Array<string>} imagesAddress
 */
function getRamdomSixImages(imagesAddress) {
    let maxIndex = imagesAddress.length - 1;
    let sixIndexsRamdom = [];
    for (let i = 0; i < 6; i++) {
        sixIndexsRamdom.push(getRandomIntInclusive(0, maxIndex));
    }
    return sixIndexsRamdom.map((index) => imagesAddress[index]);
}

async function createImagesForHome() {
    let allHomes = await Home.find({});
    for (const home of allHomes) {
        let sixRamdomImages = getRamdomSixImages(imagesAddress);
        await Home.updateOne(
            { _id: home._id },
            {
                images: sixRamdomImages,
            }
        );
    }
}

async function createImagesForRoom() {
    let allRooms = await Room.find({});
    for (const room of allRooms) {
        let sixRamdomImages = getRamdomSixImages(imagesAddress);
        await Room.updateOne(
            { _id: room._id },
            {
                images: sixRamdomImages,
            }
        );
    }
}

let description =
    '[{"key":"","des":"Nơi ở đầy phong cách này rất phù hợp cho các chuyến đi công tác, nghỉ ngơi.Tọa lạc tại địa điểm lý tưởng, yên tĩnh và gần Ngã tư Đào Tấn, Nguyễn Khánh Toàn, Quan Hoa. Cách tòa Lotte Building và Đại Sứ Quán Nhật Bản 5 phút lái xe. Gần ngã tư Cầu Giấy, Kim Mã"}]';
async function createDescriptionForHome() {
    await Home.updateMany(
        {},
        {
            description,
        }
    );
}

async function createDescriptionForRoom() {
    await Room.updateMany(
        {},
        {
            description,
        }
    );
}

async function createAmentiesForRoom() {
    let amenities = [];
    for (let index = 0; index < 11; index++) {
        amenities.push({
            title: JSON.stringify(index),
        });
    }
    await Room.updateMany(
        {},
        {
            amenities: amenities,
        }
    );
}

async function main() {
    await mongoose.connect(
        'mongodb+srv://hieucao192:helloworld123@authenticationtest.6lh8w.mongodb.net/rentroomdb?retryWrites=true&w=majority'
    );
    await createAmentiesForRoom();
    console.log('ok');
    process.exit(0);
}

main();
