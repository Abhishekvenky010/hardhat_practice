import { expect } from "chai";
import { network } from "hardhat";
const { ethers } = await network.create();

describe("MyNFT", function () {

  async function deployFixture() {

    const [owner, alice, bob] = await ethers.getSigners();

    const MyNFT = await ethers.getContractFactory("MyNFT");

    const nft = await MyNFT.deploy();

    await nft.waitForDeployment();

    return {
      nft,
      owner,
      alice,
      bob
    };
  }

  it("Should mint NFT to Alice", async function () {

    const { nft, alice } = await deployFixture();

    await nft.mint(alice.address, 1);

    expect(
      await nft.ownerOf(1)
    ).to.equal(alice.address);

  });

  it("Should not mint same NFT twice", async function () {

    const { nft, alice } = await deployFixture();

    await nft.mint(alice.address, 1);

    await expect(
      nft.mint(alice.address, 1)
    ).to.be.revertedWith("NFT already exist");

  });

  it("Owner should transfer NFT", async function () {

    const { nft, alice, bob } = await deployFixture();

    await nft.mint(alice.address, 1);

    await nft
      .connect(alice)
      .transfer(bob.address, 1);

    expect(
      await nft.ownerOf(1)
    ).to.equal(bob.address);

  });

  it("Non-owner cannot transfer NFT", async function () {

    const { nft, alice, bob } = await deployFixture();

    await nft.mint(alice.address, 1);

    await expect(
      nft
        .connect(bob)
        .transfer(bob.address, 1)
    ).to.be.revertedWith("Not owner");

  });

  it("Cannot transfer NFT to zero address", async function () {

    const { nft, alice } = await deployFixture();

    await nft.mint(alice.address, 1);

    await expect(
      nft
        .connect(alice)
        .transfer(
          ethers.ZeroAddress,
          1
        )
    ).to.be.revertedWith("Invalid address");

  });
  it("Approved address can transfer NFT", async function () {

    const { nft, alice, bob } = await deployFixture();

    await nft.mint(alice.address, 1);

    await nft.connect(alice).approve(bob.address, 1);

    await nft
        .connect(bob)
        .transferFrom(
            alice.address,
            bob.address,
            1
        );

    expect(
        await nft.ownerOf(1)
    ).to.equal(bob.address);

});

});