import * as React from "react";
import {
  Card,
  CardHeader,
  makeStyles,
  tokens,
  Text,
  Button,
  Badge,
  Avatar,
  Link,
  SearchBox,
} from "@fluentui/react-components";
import { Star24Filled, Calendar24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  card: {
    width: "100%",
    margin: "0",
    height: "fit-content",
    padding: tokens.spacingVerticalM,
    boxShadow: tokens.shadow16,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  blogContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "800px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
  },
  navigation: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  navLink: {
    color: tokens.colorNeutralForeground1,
    textDecoration: "none",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusSmall,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  authButtons: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  heroSection: {
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXL}`,
    textAlign: "center",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: tokens.fontWeightBold,
    marginBottom: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground1,
  },
  heroSubtitle: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXL,
    maxWidth: "600px",
    margin: "0 auto",
  },
  filtersSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0 ${tokens.spacingHorizontalXL}`,
    marginBottom: tokens.spacingVerticalL,
  },
  categoryFilters: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: "transparent",
    border: "none",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusSmall,
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForeground1,
    },
  },
  categoryButtonActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  searchSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  searchBox: {
    width: "300px",
  },
  contentSection: {
    padding: `0 ${tokens.spacingHorizontalXL} ${tokens.spacingVerticalXXL}`,
  },
  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: tokens.spacingHorizontalXL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  featuredPost: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalXL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  postCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    boxShadow: tokens.shadow8,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow16,
      transform: "translateY(-2px)",
    },
  },
  postImage: {
    width: "100%",
    height: "200px",
    backgroundColor: tokens.colorNeutralBackground4,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: `${tokens.borderRadiusSmall} ${tokens.borderRadiusSmall} 0 0`,
  },
  postContent: {
    padding: tokens.spacingVerticalL,
  },
  postCategory: {
    marginBottom: tokens.spacingVerticalS,
  },
  postTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
    lineHeight: tokens.lineHeightBase500,
  },
  postDescription: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalM,
  },
  postMeta: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  authorInfo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  latestSection: {
    marginTop: tokens.spacingVerticalXXL,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalL,
  },
  latestGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: tokens.spacingHorizontalL,
  },
  latestPost: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  latestPostTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  latestPostDescription: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    marginBottom: tokens.spacingVerticalS,
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalXXL,
  },
  pageNumber: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  pageNumberActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

const BlogHomepage: React.FC = () => {
  const styles = useStyles();
  const [activeCategory, setActiveCategory] = React.useState("All categories");
  const [searchQuery, setSearchQuery] = React.useState("");

  const categories = [
    "All categories",
    "Company",
    "Product",
    "Design",
    "Engineering",
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Revolutionizing software development with cutting-edge tools",
      description:
        "Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.",
      category: "Engineering",
      author: "Betty Sharp, Travis Howard",
      date: "July 14, 2021",
      image: "/api/placeholder/400/200",
      featured: true,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "Innovative product features that drive success",
      description:
        "Explore the key features of our latest product releases that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality.",
      category: "Product",
      author: "Erica Jones",
      date: "July 14, 2021",
      image: "/api/placeholder/400/200",
      featured: true,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "Our company's journey: milestones and achievements",
      description:
        "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader.",
      category: "Company",
      author: "Cindy Baker",
      date: "July 14, 2021",
      image: "/api/placeholder/400/200",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      title: "Designing for the future: trends and insights",
      description:
        "Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating impactful user experiences.",
      category: "Design",
      author: "Kate Morrison",
      date: "July 14, 2021",
      image: "/api/placeholder/400/200",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      id: 5,
      title: "Pioneering sustainable engineering solutions",
      description:
        "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future.",
      category: "Engineering",
      author: "Agnes Walker, Trevor Henderson",
      date: "July 14, 2021",
      image: "/api/placeholder/400/200",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      id: 6,
      title: "Maximizing efficiency with our latest product updates",
      description:
        "Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features.",
      category: "Product",
      author: "Travis Howard",
      date: "July 14, 2021",
      image: "/api/placeholder/400/200",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
  ];

  const latestPosts = [
    {
      title: "The future of AI in software engineering",
      description:
        "Artificial intelligence is revolutionizing software engineering. Explore how AI-driven tools are enhancing development processes and improving software quality.",
      category: "Engineering",
      author: "Betty Sharp, Travis Howard",
      date: "July 14, 2021",
    },
    {
      title: "Driving growth with user-centric product design",
      description:
        "Our user-centric product design approach is driving significant growth. Learn about the strategies we employ to create products that resonate with users.",
      category: "Product",
      author: "Erica Jones",
      date: "July 14, 2021",
    },
    {
      title: "Embracing minimalism in modern design",
      description:
        "Minimalism is a key trend in modern design. Discover how our design team incorporates minimalist principles to create clean and impactful user experiences.",
      category: "Design",
      author: "Kate Morrison",
      date: "July 14, 2021",
    },
    {
      title: "Cultivating a culture of innovation",
      description:
        "Innovation is at the heart of our company culture. Learn about the initiatives we have in place to foster creativity and drive groundbreaking solutions.",
      category: "Company",
      author: "Cindy Baker",
      date: "July 14, 2021",
    },
  ];

  const filteredPosts = blogPosts.filter(
    (post) =>
      (activeCategory === "All categories" ||
        post.category === activeCategory) &&
      (searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Text weight="semibold" size={500}>
            Blog Homepage
          </Text>
        }
        description={
          <Text>
            Sleek, modern blog homepage layout with navigation, featured posts,
            and categories
          </Text>
        }
      />
      <div className={styles.blogContainer}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <Star24Filled />
            <Text weight="semibold" size={400}>
              Sitemark
            </Text>
          </div>
          <nav className={styles.navigation}>
            <Link className={styles.navLink} href="#features">
              Features
            </Link>
            <Link className={styles.navLink} href="#testimonials">
              Testimonials
            </Link>
            <Link className={styles.navLink} href="#highlights">
              Highlights
            </Link>
            <Link className={styles.navLink} href="#pricing">
              Pricing
            </Link>
            <Link className={styles.navLink} href="#faq">
              FAQ
            </Link>
            <Link className={styles.navLink} href="#blog">
              Blog
            </Link>
          </nav>
          <div className={styles.authButtons}>
            <Button appearance="subtle">Sign in</Button>
            <Button appearance="primary">Sign up</Button>
          </div>
        </header>

        <div className={styles.heroSection}>
          <Text className={styles.heroTitle}>Blog</Text>
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  activeCategory === category ? styles.categoryButtonActive : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.searchSection}>
            <SearchBox
              className={styles.searchBox}
              placeholder="Search..."
              value={searchQuery}
              onChange={(_, data) => setSearchQuery(data.value)}
            />
          </div>
        </div>

        <div className={styles.contentSection}>
          {featuredPosts.length > 0 && (
            <div className={styles.featuredPost}>
              {featuredPosts.slice(0, 2).map((post) => (
                <div key={post.id} className={styles.postCard}>
                  <div
                    className={styles.postImage}
                    style={{
                      backgroundImage: post.gradient,
                    }}
                  />
                  <div className={styles.postContent}>
                    <div className={styles.postCategory}>
                      <Badge appearance="filled" color="brand">
                        {post.category}
                      </Badge>
                    </div>
                    <Text className={styles.postTitle}>{post.title}</Text>
                    <Text className={styles.postDescription}>
                      {post.description}
                    </Text>
                    <div className={styles.postMeta}>
                      <div className={styles.authorInfo}>
                        <Avatar size={16} />
                        <Text>{post.author}</Text>
                      </div>
                      <Text>•</Text>
                      <div className={styles.authorInfo}>
                        <Calendar24Regular />
                        <Text>{post.date}</Text>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.blogGrid}>
            {regularPosts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <div
                  className={styles.postImage}
                  style={{
                    backgroundImage: post.gradient,
                  }}
                />
                <div className={styles.postContent}>
                  <div className={styles.postCategory}>
                    <Badge appearance="filled" color="brand">
                      {post.category}
                    </Badge>
                  </div>
                  <Text className={styles.postTitle}>{post.title}</Text>
                  <Text className={styles.postDescription}>
                    {post.description}
                  </Text>
                  <div className={styles.postMeta}>
                    <div className={styles.authorInfo}>
                      <Avatar size={16} />
                      <Text>{post.author}</Text>
                    </div>
                    <Text>•</Text>
                    <div className={styles.authorInfo}>
                      <Calendar24Regular />
                      <Text>{post.date}</Text>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.latestSection}>
            <Text className={styles.sectionTitle}>Latest</Text>
            <div className={styles.latestGrid}>
              {latestPosts.map((post, index) => (
                <div key={index} className={styles.latestPost}>
                  <Badge appearance="filled" color="brand">
                    {post.category}
                  </Badge>
                  <Text className={styles.latestPostTitle}>{post.title}</Text>
                  <Text className={styles.latestPostDescription}>
                    {post.description}
                  </Text>
                  <div className={styles.postMeta}>
                    <div className={styles.authorInfo}>
                      <Avatar size={16} />
                      <Text>{post.author}</Text>
                    </div>
                    <Text>•</Text>
                    <div className={styles.authorInfo}>
                      <Calendar24Regular />
                      <Text>{post.date}</Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.pagination}>
            <button
              className={`${styles.pageNumber} ${styles.pageNumberActive}`}
            >
              1
            </button>
            <button className={styles.pageNumber}>2</button>
            <button className={styles.pageNumber}>3</button>
            <button className={styles.pageNumber}>4</button>
            <button className={styles.pageNumber}>5</button>
            <button className={styles.pageNumber}>6</button>
            <button className={styles.pageNumber}>7</button>
            <button className={styles.pageNumber}>8</button>
            <button className={styles.pageNumber}>9</button>
            <button className={styles.pageNumber}>10</button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogHomepage;
