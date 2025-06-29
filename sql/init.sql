-- Users Table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) unique NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Create CareerGrowthCards table
CREATE TABLE CareerGrowthCards (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    title_en VARCHAR,
    body TEXT,
    body_en TEXT,
    image_url VARCHAR,
    href VARCHAR,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*
-- Create BenefitCards table
CREATE TABLE BenefitCards (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    title_en VARCHAR,
    image_url VARCHAR,
    href VARCHAR,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

/*
-- Create CultureCards table
CREATE TABLE CultureCards (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    title_en VARCHAR,
    body TEXT,
    body_en TEXT,
    image_url VARCHAR,
    href VARCHAR,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

-- Create AwardCards table
CREATE TABLE AwardCards (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    title_en VARCHAR,
    body TEXT,
    body_en TEXT,
    image_url VARCHAR,
    href VARCHAR,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create LifeAtMitrpholCards table
CREATE TABLE LifeAtMitrpholCards (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    title_en VARCHAR,
    body TEXT,
    body_en TEXT,
    image_url VARCHAR,
    href VARCHAR,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create BusinessCards table
CREATE TABLE BusinessCards (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    title_en VARCHAR,
    body TEXT,
    body_en TEXT,
    image_url VARCHAR,
    href VARCHAR,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Images table
CREATE TABLE Images (
    id SERIAL PRIMARY KEY,
    image_url VARCHAR NOT NULL,
    page VARCHAR,
	section VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Texts table
CREATE TABLE Texts (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    text_en TEXT,
    page VARCHAR,
	section VARCHAR,
    type VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO 
    CareerGrowthCards (
        title, 
        title_en, 
        body, 
        body_en, 
        image_url, 
        href, 
        is_active
) VALUES
    (
        'การพัฒนาทักษะภาวะผู้นำ', 
        'Leadership Development', 
        'พัฒนาทักษะการเป็นผู้นำที่มีประสิทธิภาพ เรียนรู้การบริหารทีม และการตัดสินใจเชิงกลยุทธ์', 
        'Develop effective leadership skills, learn team management and strategic decision making', 
        '/iconMock.png',
        null, 
        true
    ),
    (
        'หลักสูตรดิจิทัลมาร์เก็ตติ้ง', 
        'Digital Marketing Course', 
        'เรียนรู้กลยุทธ์การตลาดออนไลน์ SEO SEM และการวิเคราะห์ข้อมูล', 
        'Learn online marketing strategies, SEO, SEM, and data analytics', 
        '/iconMock.png',
        null, 
        true
    ),
    (
        'โปรแกรมเมนเทอร์', 
        'Mentorship Program', 
        'รับคำแนะนำจากผู้เชี่ยวชาญในสายงาน เพื่อเร่งการเติบโตในสายอาชีพ', 
        'Get guidance from industry experts to accelerate your career growth', 
        '/iconMock.png',
        null, 
        true
    );

-- Insert mock data for BenefitCards
-- INSERT INTO 
--     BenefitCards (title, title_en, image_url, href, is_active) 
-- VALUES
--     (
--         'ประกันสุขภาพ', 
--         'Insurance', 
--         '/images/health-insurance.jpg',
--         null, 
--         true
--     ),
--     (
--         'วันหยุด', 
--         'Time Off', 
--         '/images/flexible-time.jpg',
--         null, 
--         true
--     ),
--     (
--         'โบนัส', 
--         'Bonus', 
--         '/images/bonus.jpg',
--         null, 
--         true
--     ),
--     (
--         'อุปกรณ์ทันสมัย', 
--         'Modern Equipment', 
--         '/images/equipment.jpg',
--         null, 
--         true
--     ),
--     (
--         'การเรียนรู้', 
--         'Learning', 
--         '/images/learning-budget.jpg',
--         null, 
--         true
--     ),
--     (
--         'ที่จอดรถฟรี', 
--         'Free Parking', 
--         '/images/parking.jpg',
--         null, 
--         true
--     );

-- Insert mock data for AwardCards
INSERT INTO 
    AwardCards (
        title, 
        title_en, 
        body, 
        body_en, 
        image_url, 
        href, 
        is_active
) VALUES
    (
        'รางวัลนายจ้างดีเด่น 2024', 
        'Best Employer Award 2024', 
        'ได้รับการยอมรับในด้านการดูแลพนักงานและสภาพแวดล้อมการทำงานที่ดี', 
        'Recognized for excellent employee care and work environment', 
        '/mock-award.png',
        null, 
        true
    ),
    (
        'รางวัลองค์กรนวัตกรรม', 
        'Innovation Company Award', 
        'ได้รับรางวัลจากการพัฒนาผลิตภัณฑ์และบริการที่สร้างสรรค์', 
        'Awarded for developing creative products and services', 
        '/mock-award.png',
        null, 
        true
    ),
    (
        'รางวัลความรับผิดชอบต่อสังคม', 
        'CSR Excellence Award', 
        'ยกย่องในด้านการดำเนินธุรกิจที่มีความรับผิดชอบต่อสังคม', 
        'Recognized for socially responsible business practices', 
        '/mock-award.png',
        null, 
        true
    ),
    (
        'Top 100 บริษัทน่าทำงาน', 
        'Top 100 Great Places to Work', 
        'ติดอันดับ 100 บริษัทที่น่าทำงานที่สุดในประเทศไทย', 
        'Ranked among top 100 best companies to work for in Thailand', 
        '/mock-award.png',
        null, 
        true
    );

-- Insert mock data for LifeAtMitrpholCards
INSERT INTO LifeAtMitrpholCards (
    title, 
    title_en, 
    body, 
    body_en, 
    image_url, 
    href, 
    is_active
) VALUES
    (
        'กิจกรรมทีมบิลดิ้ง', 
        'Team Building Activities', 
        'จัดกิจกรรมสร้างความสัมพันธ์ในทีมงานอย่างสม่ำเสมอ', 
        'Regular team relationship building activities', 
        '/mock-award.png',
        null, 
        true
    ),
    (
        'วันเกมส์กีฬาประจำปี', 
        'Annual Sports Day', 
        'แข่งขันกีฬาสีสันสนุกสนาน เสริมสร้างสุขภาพและมิตรภาพ', 
        'Fun colorful sports competition promoting health and friendship', 
        '/mock-award.png',
        null, 
        true
    ),
    (
        'เฟสติวัลอาหารนานาชาติ', 
        'International Food Festival', 
        'ลิ้มรสอาหารจากทั่วโลก และแบ่งปันวัฒนธรรมที่หลากหลาย', 
        'Taste food from around the world and share diverse cultures', 
        '/mock-award.png',
        null, 
        true
    ),
    (
        'พื้นที่พักผ่อนและเกม', 
        'Recreation & Game Zone', 
        'พื้นที่พักผ่อนที่ทันสมัย พร้อมเกมและกิจกรรมผ่อนคลาย', 
        'Modern recreation area with games and relaxing activities', 
        '/mock-award.png',
        null, 
        true
    ),
    (
        'โครงการอาสาสมัคร', 
        'Volunteer Program', 
        'ร่วมกิจกรรมเพื่อสังคม และสร้างความหมายให้กับการทำงาน', 
        'Participate in social activities and create meaningful work', 
        '/mock-award.png',
        null, 
        true
    );

-- Insert mock data for BusinessCards
INSERT INTO BusinessCards (
    title, 
    title_en, 
    body, 
    body_en, 
    image_url, 
    href, 
    is_active
) VALUES
    (
        'โซลูชันดิจิทัลครบวงจร', 
        'Complete Digital Solutions', 
        'ให้บริการพัฒนาแอปพลิเคชัน เว็บไซต์ และระบบดิจิทัลแบบครบวงจร', 
        'Comprehensive app development, website, and digital system services', 
        '/mock-business.avif', 
        null, 
        true
    ),
    (
        'คอนซัลติ้งธุรกิจ', 
        'Business Consulting', 
        'ปรึกษาเชิงกลยุทธ์ วิเคราะห์ธุรกิจ และวางแผนการเติบโต', 
        'Strategic consulting, business analysis, and growth planning', 
        '/mock-business.avif', 
        null, 
        true
    ),
    (
        'ระบบการจัดการข้อมูล', 
        'Data Management Systems', 
        'พัฒนาระบบจัดการข้อมูลและการวิเคราะห์ที่มีประสิทธิภาพ', 
        'Develop efficient data management and analytics systems', 
        '/mock-business.avif', 
        null, 
        true
    ),
    (
        'บริการคลาวด์และโครงสร้างพื้นฐาน', 
        'Cloud & Infrastructure Services', 
        'จัดการโครงสร้างพื้นฐาน IT และบริการคลาวด์ที่ปลอดภัย', 
        'Manage IT infrastructure and secure cloud services', 
        '/mock-business.avif', 
        null, 
        true
    ),
    (
        'บริการคลาวด์และโครงสร้างพื้นฐาน', 
        'Cloud & Infrastructure Services', 
        'จัดการโครงสร้างพื้นฐาน IT และบริการคลาวด์ที่ปลอดภัย', 
        'Manage IT infrastructure and secure cloud services', 
        '/mock-business.avif', 
        null, 
        true
    ),
    (
        'บริการคลาวด์และโครงสร้างพื้นฐาน', 
        'Cloud & Infrastructure Services', 
        'จัดการโครงสร้างพื้นฐาน IT และบริการคลาวด์ที่ปลอดภัย', 
        'Manage IT infrastructure and secure cloud services', 
        '/mock-business.avif', 
        null, 
        true
    );

-- Insert mock data for Images
INSERT INTO Images (image_url, page, section) VALUES
('/homeHeroBg.png', 'home', 'hero');

-- Insert mock data for Texts
INSERT INTO 
    Texts (
        text, 
        text_en, 
        page, 
        section, 
        type
) VALUES
    (
        'ขับเคลื่อนด้วยนวัตกรรมเติบโตได้เพราะคน', 
        'DRIVEN BY INNOVATION POWERED BY PEOPLE', 
        'home', 
        'hero', 
        'heading'
    );


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_careergrowthcards_updated_at BEFORE UPDATE ON CareerGrowthCards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_awardcards_updated_at BEFORE UPDATE ON AwardCards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lifeatmitrpholcards_updated_at BEFORE UPDATE ON LifeAtMitrpholCards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_businesscards_updated_at BEFORE UPDATE ON BusinessCards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON Images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_texts_updated_at BEFORE UPDATE ON Texts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION hash_password(password TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN crypt(password, gen_salt('bf', 10)); -- 'bf' for bcrypt, 10 is the cost factor
END;
$$ LANGUAGE plpgsql;

INSERT INTO
    Users (
    username,
    password, 
    name
)  VALUES
        (
            'careerpage_admin_1',
            hash_password('admin_1'),
            'Career Page Admin 1'
        ),
        (
            'careerpage_admin_2',
            hash_password('admin_2'),
            'Career Page Admin 2'
        ),
        (
            'careerpage_admin_3',
            hash_password('admin_3'),
            'Career Page Admin 3'
        );

CREATE OR REPLACE FUNCTION verify_password(password TEXT, password_hash TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN crypt(password, password_hash) = password_hash;
END;
$$ LANGUAGE plpgsql;