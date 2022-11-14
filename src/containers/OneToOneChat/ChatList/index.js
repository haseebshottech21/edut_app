import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Platform,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { CustomNavbar } from '../../../components';
import { Images, AppStyles, Colors, Metrics } from '../../../theme';
import { connect } from 'react-redux';
import {
    getAllUsers,
    getSearchUsers,
} from '../../../actions/OneToOneChat';
import util from '../../../util';

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyUsersData: [],
            AllUsersData: [],
            loading: false,
            userSearchLoading: false,
            width: 0,
            verseData: '',
            searchUsers: '',
        };
        // create a ref to store the textInput DOM element
        this.textInputSearch = React.createRef();
    }
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.fetchData();
        });
    }
    componentWillUnmount() {
        this.focusListener();
    }
    fetchData = () => {
        util.showLoader(this);

        this.props.getAllUsers(res => {
            if (res) {
                util.hideLoader(this);
                this.setState({
                    MyUsersData: res,
                    AllUsersData: res,
                });
            }
            util.hideLoader(this);
        });
    };
    _renderUsers = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                    this.props.navigation.navigate('ChatMessages', {
                        group_id: item.id,
                        group_name: item.name,
                    })
                }
                style={{
                    padding: 15,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    borderColor: Colors.blue,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    marginBottom: 10,
                }}>
                <Image
                    source={{
                        uri: item.image,
                    }}
                    style={{
                        width: 45,
                        height: 45,
                        resizeMode: 'contain',
                        borderRadius: 45,
                    }}
                />
                <Text
                    style={{
                        flex: 1,
                        marginLeft: 20,
                        color: Colors.blue,
                        fontWeight: '400',
                        fontSize: 12,
                    }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };
    renderEmpty = () => {
        if (this.state.loading) return null;
        return (
            <View style={[AppStyles.centerInner, { marginTop: 20 }]}>
                <Text color="black">Start a Chat or Create a Message</Text>
            </View>
        );
    };
    onSubmitEditing = () => {
        console.log('onSubmitEditing');
        util.showLoader(this);
        let payload = { search: this.state.searchUsers };
        this.props.getSearchUsers(payload, res => {
            if (res) {
                util.hideLoader(this);
                console.log('getAllUsers res', res?.length, 'getAllUsers res');
                this.setState({
                    MyUsersData: res,
                });
            } else {
                this.setState({
                    MyUsersData: [],
                });
            }
            util.hideLoader(this);
            this.setState({ searchUsers: '' });
        });
    };
    onBringAllData = () => {
        this.setState({
            MyUsersData: this.state.AllUsersData,
        });
    }
    render() {
        const { loading, userSearchLoading, searchUsers } = this.state;
        return (
            <View style={{ flex: 1, position: 'relative' }}>
                <CustomNavbar
                    title="Conversation"
                    titleBackgroundColor="white"
                    leftBtnImage={Images.back_image}
                    leftBtnPress={() => this.props.navigation.goBack()}
                />
                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 30,
                        margin: 15,
                        alignItems: 'center',
                    }}>
                    <SearchBar
                        ref={this.textInputSearch}
                        placeholder="Search User Here..."
                        lightTheme={true}
                        platform={Platform.OS}
                        containerStyle={{ height: Metrics.screenHeight * 0.07, borderRadius: 30, padding: 0, margin: 0, width: Metrics.screenWidth * 0.9, backgroundColor: 'white' }}
                        leftIconContainerStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: 'white', padding: 0, margin: 0, }}
                        rightIconContainerStyle={{ backgroundColor: 'white' }}
                        inputContainerStyle={{ backgroundColor: 'white', padding: 0, margin: 0, borderRadius: 30, marginTop: Platform.OS == 'android' ? -5 : 0 }}
                        round={true}
                        showLoading={userSearchLoading}
                        showCancel={true}
                        onChangeText={(searchUserText) => this.setState({ searchUsers: searchUserText })}
                        value={searchUsers}
                        keyboardAppearance={'light'}
                        returnKeyLabel={'search'}
                        returnKeyType={'search'}
                        onSubmitEditing={() => this.onSubmitEditing()}
                        onClear={() => this.onBringAllData()}
                        onCancel={() => this.onBringAllData()}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ marginHorizontal: 20, marginTop: 20 }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        data={this.state.MyUsersData}
                        ListEmptyComponent={this.renderEmpty}
                        renderItem={this._renderUsers}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={this.fetchData}
                                tintColor="#000"
                                titleColor="#000"
                            />
                        }
                        bounces={false}
                    />
                </View>
            </View>
        );
    }
}
const mapStateToProps = () => ({});

const actions = { getAllUsers, getSearchUsers };

export default connect(mapStateToProps, actions)(ChatList);
