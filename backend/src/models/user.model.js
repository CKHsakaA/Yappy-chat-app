import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName :{
        type :String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQArgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcDBAUCAf/EADwQAAICAQIDBAcFBAsAAAAAAAABAgMEBREGEjEhQVFhIkJxkbHB0RMyUoGhFCPh8BUkMzQ1Q1NicnOC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAERIf/aAAwDAQACEQMRAD8AtIAGmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMGXl4+HX9plXQqj3cz239nic3iHXIaVUoVpTybFvCL6RXi/p3kDycm7Lvlfk2Sssl3yZRNreLtMrltFX2LxhDs/VoyY3FOl3yUZWWUt99sOz3rcr8A1bNdkLYRnXKM4SW6lF7pnorLSdVydLt5qJc1be86pP0ZfT2lhaZn0aliRyMeXZ0lF9YvwYG2ACAAAAAAAAAAAAAAAAAYM3Jhh4luTa/Qrju/oZyNcc5Dhp9GPF/2tm8vYv5XuAh+Zk25mTZkZEuayx7vyXcjCAaiAAAHW4a1N6bqMOeX7i58lifReD/AC+bOSGSi2waOiZDytJxbpPeTrSlv3tdj+BvEUAAAAAAAAAAAAAAAAIjx797CflP5EuIzx1S5YONavUt5X+a/gBCgAaiAAAAAlFh8Jf4Dj/+vizsGhoNLo0bDhJbS+zTa9vab5FAAAAAAAAAAAAAAAADT1fCWoabfivbecfRb7pLtX6m4AKmnCVc5V2RcZxe0k+5nknPEnD37fJ5eHssjb04PsU/PfxIVfTbj2OvIqnVNdYzWzLEYwAUDd0fBlqWo1YyT5W+ax+EV1PGBp2VqFvJi0ymvWn0jH2sn2h6RVpONyJqd0+2yzbr5LyJTHSSSWyWyXRH0AigAAAAAAAAAAAAAAAAAAGK/HpyIcl9ULI+E47mhn6/p2C3G2/7Sxf5dS5n9P1OLkcZtvbGwdl42T+SA7M+HdJslu8OC/4ykvgz3ToOlUtOGFW3/u3l8SMS4w1Bvsqx17Yt/M+18Y56+9RRL3oHE2hCMI8sIqEV0SXYeiLY3GdEmllYllfjKuSkvd2HdwdTwtQ/ul8Zy235OkvcyjcABAAAAAAAAAAAAAAADQ1nVKtJxftbPSsk9qq/xP6Ae9T1LG0yj7XJns39yC+9N+RB9X4gzNRk4Juijurg+q833nPzcu/OyJX5NjnN+5LwSMBSi7OgAKgAAB9i3Fpxbi10aezR8AEl0biq7HcatRTuq7ErV9+K+ZMqLqsmmN1E4zrkuyUXumVQdPQ9Zu0nITjvPHnL95X4+a8yKsgGLGvqyqIX48uaqa3i0ZSAAAAAAAAAAAPF1sKKp22vauEXKT8itNX1CzU82d9jfJ0rh+GPgSbjfOddFeDB9tnpz2fqrp+vwIYUAAVAAAAAAAAAAASHhHVniZSw7p/1e57R39Sf0f0J0VJ+hZXD+f8A0hpdV0nvbH0LO3vXf+fUix0QARQABAAAADzZPkrnP8MWyit+Icr9r1rKs9WMuSHsXZ9TnH1yc3zS6y7WfAgACgAAAAAAAAAABKOBcnlycnF9WyKnH2rr/PkRc6vC1rq17F26Tbi/cyCxgAFAAQAAANfUHtp+U1/oz+DAKKsXRAArIAAoAAAAAAAAAABvaE9tbwf+6PxAAs0AEUABB//Z"
    },
    bio: {
        type: String
    }

}, {
    timestamps: true
}
)

const User = mongoose.model("User", userSchema)

export default User