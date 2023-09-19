"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Link from "next/link";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentTagFilter, setCurrentTagFilter] = useState(null);

  const handleSearchChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    if (newSearchText.trim() === "") {
      setFilteredPosts([]);
      setSearchDropdown(false);
    } else {
      setSearchDropdown(true);
      const filtered = currentTagFilter.filter(
        (post) =>
          post.tag &&
          post.tag.toLowerCase().includes(newSearchText.toLowerCase())
      );
      setFilteredPosts(filtered);
      // console.log(filteredPosts)
    }
  };

  const handleTagClick = (clickedTag) => {
    const postsWithClickedTag = currentTagFilter.filter(
      (post) =>
        post.tag &&
        post.tag.toLowerCase() === clickedTag.toLowerCase()
    );
    // console.log(filteredPosts)
    setPosts(postsWithClickedTag);
    setSearchDropdown(false); // Close the search dropdown
  };
  
  useEffect(() => {
    console.log(filteredPosts);
  }, [filteredPosts]);
  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt/new");
      const data = await response.json();
      setPosts(data);
      setCurrentTagFilter(data)
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a name"
          // value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer focus:border-[#eab308]"
        />
      </form>

      {searchDropdown && (
  <div className="w-full -mt-1 cursor-context-menu">
    <div className="flex flex-col bg-white border border-gray-300 rounded-md">
      {filteredPosts.map((post) => (
        <div
          className="w-full px-4 py-1 hover:bg-gray-200 text-black font-medium"
          key={post._id}
          onClick={() => handleTagClick(post.tag)}
        >
          {post.tag}
        </div>
      ))}
    </div>
  </div>
)}


      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
